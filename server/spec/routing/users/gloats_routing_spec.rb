require "rails_helper"

RSpec.describe Users::GloatsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/users/testuser/gloats").to route_to("users/gloats#index", id: "testuser")
    end
  end
end
