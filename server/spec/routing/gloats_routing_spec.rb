require "rails_helper"

RSpec.describe GloatsController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/api/gloats").to route_to("gloats#index")
    end

    it "routes to #show" do
      expect(:get => "/api/gloats/1").to route_to("gloats#show", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/api/gloats").to route_to("gloats#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/api/gloats/1").to route_to("gloats#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/api/gloats/1").to route_to("gloats#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/api/gloats/1").to route_to("gloats#destroy", :id => "1")
    end
  end
end
