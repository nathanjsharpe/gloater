require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
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
        do_request
        expect(response.body).to be_valid_json
        expect(body_as_json).to match({
          token: be_kind_of(String),
          expires_at: be_kind_of(String),
          user: {
            id: user.id,
            email: user.email,
            city: user.city,
            state: user.state,
            company: user.company,
            profession: user.profession,
            created_at: be_kind_of(String)
          },
        })
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
end
