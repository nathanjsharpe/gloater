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
  end

  describe "GET #show" do
    before(:each) do
      get :show, params: { id: user.id }
    end

    let(:user) { Fabricate(:user) }

    it "returns http status success" do
      expect(response).to have_http_status(:success)
    end

    it "responds with JSON containing user" do
      expect(response.body).to be_valid_json
      expect(body_as_json).to include({
        id: user.id,
        email: user.email,
        city: user.city,
        state: user.state,
        image: user.image
      })
    end

    it "does not include private fields in response object" do
      expect(body_as_json).to_not include(:password_digest, :updated_at)
    end

    context "with valid token" do
      let(:api_token) { Fabricate(:api_token) }
      let(:current_user) { api_token.user }

      before(:each) do
        @request.headers["Authorization"] = api_token.token
      end

      def do_request
        get :show, params: { id: user.id }
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
