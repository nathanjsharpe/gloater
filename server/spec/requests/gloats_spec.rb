require 'rails_helper'

RSpec.describe "Gloats API", type: :request do
  describe "GET /gloats" do
    it "returns all gloats" do
      Fabricate.times(3, :gloat)

      get '/api/gloats'

      expect(response).to have_http_status(:success)

      expect(json.length).to eq(3)
    end
  end

  describe "GET /gloats/:id" do
    it "returns returns a specific gloat" do
      gloat = Fabricate(:gloat)

      get "/api/gloats/#{gloat.id}"

      expect(response).to have_http_status(:success)

      expect(json).to include({
        "id" => gloat.id,
        "content" => gloat.content
      })
    end
  end

end
