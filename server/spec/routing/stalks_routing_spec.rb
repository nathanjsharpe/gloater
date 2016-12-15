require "rails_helper"

RSpec.describe StalksController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/stalked_users").to route_to("stalks#index")
    end

    it "routes to #create" do
      expect(:post => "/users/1/stalk").to route_to("stalks#create", user_id: "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/users/1/stalk").to route_to("stalks#destroy", :user_id => "1")
    end
  end
end
