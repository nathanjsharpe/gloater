require "rails_helper"

RSpec.describe AdmiresController, type: :routing do
  describe "routing" do

    it "routes to #create" do
      expect(:post => "/api/gloats/1/admire").to route_to("admires#create", gloat_id: "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/api/gloats/1/admire").to route_to("admires#destroy", :gloat_id => "1")
    end
  end
end
