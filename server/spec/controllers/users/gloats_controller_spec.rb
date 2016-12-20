require 'rails_helper'

RSpec.describe Users::GloatsController, type: :controller do
  describe "GET #index" do
    it "returns only the specified user's gloats" do
      user = Fabricate(:user)
      Fabricate.times(3, :gloat, user: user)
      Fabricate.times(2, :gloat)

      get :index, params: { id: user.username }
      expect(body_as_json.length).to be(3)
    end

    describe "pagination" do
      before do
        Fabricate.times(Kaminari.config.default_per_page + 1, :gloat, user: user)
      end

      subject { :index }
      let(:params) { { id: user.username } }
      let(:user) { Fabricate(:user) }

      it_behaves_like "paginated"
    end
  end
end
