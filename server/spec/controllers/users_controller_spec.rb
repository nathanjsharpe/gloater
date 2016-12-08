require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  let(:valid_session) { {} }

  describe "GET #index" do
    before do
      Fabricate.times(3, :user)
      get :index, params: {}, session: valid_session
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
    before do
      get :show, params: { id: user.id }, session: valid_session
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
      })
    end

    it "does not include private fields in response object" do
      expect(body_as_json).to_not include(:password_digest, :updated_at)
    end
  end

  describe "POST #create" do

    context "with valid params" do
      def do_request
        post :create, params: { user: user_attributes }, session: valid_session
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
          id: be_kind_of(Integer)
        })
      end

      it "does not include password digest in return JSON" do
        do_request
        expect(body_as_json).not_to include(:password_digest)
      end
    end

    context "with invalid params" do
      def do_request
        post :create, params: { user: user_attributes }, session: valid_session
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
    end
  end
end
