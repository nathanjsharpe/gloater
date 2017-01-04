require 'rails_helper'

RSpec.describe AdmiresController, type: :controller do
  context "with valid token" do
    include_context "authenticated"

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
        }.to change(current_user.reload.admired_gloats, :count).by(1)
      end

      it "returns admired gloat as json" do
        do_request
        expect(response.body).to be_valid_json
        expect(body_as_json).to include({
          id: gloat.id,
          admired: true,
          admirers_count: 1,
        })
      end
    end

    describe "DELETE #destroy" do
      let!(:gloat) { Fabricate(:gloat, admirers: [current_user]) }

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
        }.to change(current_user.reload.admired_gloats, :count).by(-1)
      end

      it "returns gloat as json" do
        do_request
        expect(response.body).to be_valid_json
        expect(body_as_json).to include({
          id: gloat.id,
          admired: false,
          admirers_count: 0,
        })
      end

    end

  end

  context "without valid token" do
    describe "POST #create" do
      let(:gloat) { Fabricate(:gloat) }

      before { post :create, params: { gloat_id: gloat.id } }

      it_behaves_like "an unauthorized request"
    end

    describe "DELETE #destroy" do
      let(:gloat) { Fabricate(:gloat) }

      before { delete :destroy, params: { gloat_id: gloat.id } }

      it_behaves_like "an unauthorized request"
    end
  end
end
