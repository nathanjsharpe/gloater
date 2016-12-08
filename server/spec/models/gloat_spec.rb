require 'rails_helper'

RSpec.describe Gloat, type: :model do
  it "is valid with valid attributes" do
    expect(Fabricate.build(:gloat)).to be_valid
  end
end
