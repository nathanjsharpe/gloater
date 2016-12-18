require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  describe "GET #index" do
    before do
      Fabricate.times(3, :user)
      get :index, params: {}
    end

    it "responds with http success" do
      expect(response).to have_http_status(:success)
    end

    it "responds with JSON containing users" do
      expect(response.body).to be_valid_json
      expect(body_as_json.length).to eq(3)
    end

    it "does not include gloats with users" do
      expect(body_as_json.first).not_to include("gloats")
    end

    context "without valid token and stalked parameter true" do
      before do
        get :index, params: { stalked: true }
      end

      it_behaves_like "an unauthorized request"
    end

    context "with valid token and stalked parameter true" do
      include_context "authenticated"

      it "returns only users stalked by the current user" do
        stalked_user = Fabricate(:user, stalkers: [current_user])
        unstalked_user = Fabricate(:user)

        get :index, params: { stalked: true }
        expect(body_as_json.length).to equal(1)
        expect(body_as_json.first["id"]).to equal(stalked_user.id)
      end
    end
  end

  describe "GET #show" do
    def do_request
      get :show, params: { id: user.username }
    end

    let(:user) { Fabricate(:user) }

    it "returns http status success" do
      do_request
      expect(response).to have_http_status(:success)
    end

    it "responds with JSON containing user" do
      do_request
      expect(response.body).to be_valid_json
      expect(body_as_json).to include({
        username: user.username,
        email: user.email,
        city: user.city,
        state: user.state,
        image: user.image
      })
    end

    it "includes user's gloats in response" do
      Fabricate.times(2, :gloat, user: user)
      do_request
      expect(body_as_json).to include(:gloats)
      expect(body_as_json[:gloats].length).to equal(2)
    end

    it "does not include private fields in response object" do
      do_request
      expect(body_as_json).to_not include(:password_digest, :updated_at)
    end

    it "does not include stalked for unauthenticated requests" do
      do_request
      expect(body_as_json).to_not include(:stalked)
    end

    context "with valid token" do
      let(:api_token) { Fabricate(:api_token) }
      let(:current_user) { api_token.user }

      before(:each) do
        @request.headers["Authorization"] = api_token.token
      end

      def do_request
        get :show, params: { id: user.username }
      end

      it "indicates user is not stalked if current user is not stalking user" do
        do_request
        expect(body_as_json).to include({
          stalked: false
        })
      end

      it "indicates user is stalked if current user is stalking user" do
        current_user.stalked_users << user
        current_user.save
        do_request
        expect(body_as_json).to include({
          stalked: true
        })
      end
    end
  end

  describe "POST #create" do

    context "with valid params" do
      def do_request
        post :create, params: { user: user_attributes }
      end

      let(:user_attributes) { Fabricate.attributes_for(:new_user) }

      it "creates a new User" do
        expect {
          do_request
        }.to change(User, :count).by(1)
      end

      it "responds with created status" do
        do_request
        expect(response).to have_http_status(:created)
      end

      it "responds with JSON containing user" do
        do_request
        expect(response.body).to be_valid_json
        expect(body_as_json).to include({
          email: user_attributes[:email],
          id: be_kind_of(Integer),
          image: user_attributes[:image]
        })
      end

      it "does not include password digest in return JSON" do
        do_request
        expect(body_as_json).not_to include(:password_digest)
      end
    end

    context "with invalid params" do
      def do_request
        post :create, params: { user: user_attributes }
      end

      let(:user_attributes) { Fabricate.attributes_for(:new_user, email: '') }

      it "does not create a User" do
        expect {
          do_request
        }.to_not change(User, :count)
      end

      it "returns 422 status" do
        do_request
        expect(response).to have_http_status(422)
      end

      it "responds with json containing the validation error" do
        do_request
        expect(response.body).to be_valid_json
        expect(body_as_json).to match({
          email: [
            "can't be blank",
            "must be a valid email address"
          ]
        })
      end
    end
  end
end
