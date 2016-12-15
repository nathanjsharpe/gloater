require 'rails_helper'

RSpec.describe AdmiresController, type: :controller do
  context "with valid token" do
    before(:each) do
      @request.headers["Authorization"] = api_token.token
    end

    let(:api_token) { Fabricate(:api_token) }
    let(:user) { api_token.user }

    describe "GET #index" do
      before(:each) do
        Fabricate.times(3, :gloat, admirers: [user])
        Fabricate.times(5, :gloat, admirers: [Fabricate(:user)])
        get :index
      end

      it "returns http success" do
        expect(response).to have_http_status(:success)
      end

      it "returns current user's admired gloats as json" do
        expect(response.body).to be_valid_json
        expect(body_as_json.length).to eq(3)
      end
    end

    describe "POST #create" do
      let(:gloat) { Fabricate(:gloat) }

      def do_request
        post :create, params: { gloat_id: gloat.id }
      end

      it "returns http success" do
        do_request
        expect(response).to have_http_status(:success)
      end

      it "adds gloat to user's admired gloats" do
        expect {
          do_request
        }.to change(user.reload.admired_gloats, :count).by(1)
      end

      it "returns admired gloat as json" do
        do_request
        expect(response.body).to be_valid_json
        expect(body_as_json).to include({
          id: gloat.id
        })
      end
    end

    describe "DELETE #destroy" do
      let!(:gloat) { Fabricate(:gloat, admirers: [user]) }

      def do_request
        delete :destroy, params: { gloat_id: gloat.id }
      end

      it "returns http success" do
        do_request
        expect(response).to have_http_status(:success)
      end

      it "removes gloats from user's admired gloats" do
        expect {
          do_request
        }.to change(user.reload.admired_gloats, :count).by(-1)
      end
    end

  end

  context "without valid token" do
  end
end
