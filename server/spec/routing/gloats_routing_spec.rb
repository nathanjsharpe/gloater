require "rails_helper"

RSpec.describe GloatsController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/gloats").to route_to("gloats#index")
    end

    it "routes to #show" do
      expect(:get => "/gloats/1").to route_to("gloats#show", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/gloats").to route_to("gloats#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/gloats/1").to route_to("gloats#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/gloats/1").to route_to("gloats#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/gloats/1").to route_to("gloats#destroy", :id => "1")
    end
  end
end
