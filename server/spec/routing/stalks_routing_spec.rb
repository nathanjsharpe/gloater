require "rails_helper"

RSpec.describe StalksController, type: :routing do
  describe "routing" do

    it "routes to #create" do
      expect(:post => "/api/users/testuser/stalk").to route_to("stalks#create", user_id: "testuser")
    end

    it "routes to #destroy" do
      expect(:delete => "/api/users/testuser/stalk").to route_to("stalks#destroy", :user_id => "testuser")
    end
  end
end
