require "rails_helper"

RSpec.describe ApiTokensController, type: :routing do
  describe "routing" do

    it "routes to #create" do
      expect(:post => "/api/api_token").to route_to("api_tokens#create")
    end

    it "routes to #destroy" do
      expect(:delete => "/api/api_token").to route_to("api_tokens#destroy")
    end
  end
end
