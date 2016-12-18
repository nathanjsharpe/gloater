require 'rails_helper'

RSpec.describe StalksController, type: :controller do
  context "with valid token" do
    include_context "authenticated"

    describe "POST #create" do
      let(:stalkee) { Fabricate(:user) }

      def do_request
        post :create, params: { user_id: stalkee.id }
      end

      it "returns http success" do
        do_request
        expect(response).to have_http_status(:success)
      end

      it "adds user to user's stalked users" do
        expect {
          do_request
        }.to change(current_user.reload.stalked_users, :count).by(1)
      end

      it "returns stalked user as json" do
        do_request
        expect(response.body).to be_valid_json
        expect(body_as_json).to include({
          id: stalkee.id
        })
      end
    end

    describe "DELETE #destroy" do
      let!(:stalkee) { Fabricate(:user) }

      before do
        current_user.stalked_users << stalkee
        current_user.save
      end

      def do_request
        delete :destroy, params: { user_id: stalkee.id }
      end

      it "returns http success" do
        do_request
        expect(response).to have_http_status(:success)
      end

      it "removes user from user's stalked_users" do
        expect {
          do_request
        }.to change(current_user.reload.stalked_users, :count).by(-1)
      end
    end

  end

  context "without valid token" do
    describe "POST #create" do
      let(:stalkee) { Fabricate(:user) }

      before { post :create, params: { user_id: stalkee.id } }

      it_behaves_like "an unauthorized request"
    end

    describe "DELETE #destroy" do
      let(:stalkee) { Fabricate(:user) }

      before { delete :destroy, params: { user_id: stalkee.id } }

      it_behaves_like "an unauthorized request"
    end
  end
end
