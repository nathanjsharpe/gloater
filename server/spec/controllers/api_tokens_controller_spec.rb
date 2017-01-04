require 'rails_helper'

RSpec.describe ApiTokensController, type: :controller do
  describe "POST #create" do
    def do_request
      post :create, params: { user: { email: user.email, password: user.password } }
    end

    context "with valid username and password" do
      let(:user) { Fabricate(:new_user) }

      it "returns http status 201" do
        do_request
        expect(response).to have_http_status(201)
      end

      it "creates a new api token" do
        expect {
          do_request
        }.to change(ApiToken, :count).by(1)
      end

      it "responds with JSON containing user and api token" do
        gloat = Fabricate(:gloat, user: user)

        do_request
        expect(response.body).to be_valid_json
        expect(body_as_json).to match({
          token: be_kind_of(String),
          expires_at: be_kind_of(String),
          user: {
            name: user.name,
            id: user.id,
            email: user.email,
            city: user.city,
            state: user.state,
            company: user.company,
            profession: user.profession,
            created_at: be_kind_of(String),
            image: user.image,
            username: user.username,
            stalkers_count: 0,
          },
        })
      end

      it "does not include stalked key in returned user" do
        do_request
        expect(body_as_json).not_to include(:stalked)
      end
    end

    context "with wrong password" do

      let(:user) { Fabricate(:new_user) }

      it "returns http status 401" do
        post :create, params: { user: { email: user.email, password: 'wrongpassword' } }
        expect(response).to have_http_status(401)
      end

      it "does not create a new api token" do
        expect {
          post :create, params: { user: { email: user.email, password: 'wrongpassword' } }
        }.not_to change(ApiToken, :count)
      end
    end

    context "with wrong email" do
      let(:user) { Fabricate(:new_user) }

      it "returns http status 401" do
        post :create, params: { user: { email: "nope#{user.email}", password: 'password' } }
        expect(response).to have_http_status(401)
      end

      it "does not create a new api token" do
        expect {
          post :create, params: { user: { email: "nope#{user.email}", password: 'password' } }
        }.not_to change(ApiToken, :count)
      end
    end
  end

  describe "DELETE #destroy" do
    context "with valid api token" do
      include_context "authenticated"

      it "deletes api token" do
        expect {
          delete :destroy
        }.to change(ApiToken, :count).by(-1)
      end

      it "returns success status" do
        delete :destroy
        expect(response).to have_http_status(:success)
      end
    end

    context "without valid api token" do
      before(:each) do
        delete :destroy
      end

      it_behaves_like "an unauthorized request"
    end
  end
end
