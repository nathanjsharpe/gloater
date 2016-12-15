require 'rails_helper'

RSpec.describe Gloat, type: :model do
  it "is valid with valid attributes" do
    expect(Fabricate.build(:gloat)).to be_valid
  end

  it { should validate_presence_of :content }
  it { should validate_length_of(:content).is_at_most(140) }

  it { should belong_to :user }
  it { should have_and_belong_to_many :admirers}
end
