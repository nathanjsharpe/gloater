require 'rails_helper'

def serialize_and_parse(gloat, scope)
  serializer = GloatSerializer.new(gloat, { scope: scope })
  serialization = ActiveModelSerializers::Adapter.create(serializer)
  json_str_to_hash(serialization.to_json)
end

RSpec.describe GloatSerializer do

  context "with no current user" do
    let(:gloat) { Fabricate(:gloat) }
    subject { serialize_and_parse(gloat, nil) }

    it "includes basic user information for author of gloat" do
      expect(subject[:user]).to include(:username, :name, :image)
    end

    it { should_not include(:admired) }
  end

  context "when current user is not author of gloat" do
    let(:gloat) { Fabricate(:gloat) }
    let(:current_user) { Fabricate(:user) }
    subject { serialize_and_parse(gloat, current_user) }

    it { should include(:admired) }
  end

  context "when current user is the author of gloat" do
    let(:current_user) { Fabricate(:user) }
    let(:gloat) { Fabricate(:gloat, user: current_user) }
    subject { serialize_and_parse(gloat, current_user) }

    it { should_not include(:admired) }
  end
end
