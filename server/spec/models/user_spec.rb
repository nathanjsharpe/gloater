require 'rails_helper'

# Gravatar testing values from http://en.gravatar.com/site/implement/hash/

RSpec.describe User, type: :model do
  subject { Fabricate.build(:new_user) }

  it { should be_valid }

  it { should validate_presence_of(:email) }
  it { should validate_uniqueness_of(:email).case_insensitive }
  it { should validate_presence_of(:username) }
  it { should validate_uniqueness_of(:username).case_insensitive }
  it { should validate_length_of(:username).is_at_least(3) }
  it { should validate_presence_of(:name) }
  it { should validate_length_of(:name).is_at_least(3) }
  it { should have_secure_password }

  it { should have_many(:admired_gloats).through(:admires) }
  it { should have_many(:stalkers).through(:stalks) }
  it { should have_many(:stalked_users).through(:stalks) }
  it { should have_many :api_tokens }
  it { should have_many :gloats }

  it "validates format of email address" do
    invalid_email_addresses = [
      'user',
      'userexample.com',
      '@example.com',
      ' @ ',
      ' @example.com'
    ]

    valid_email_addresses = [
      'user@example.com',
      'user@example',
      'user.test@example.com',
      'user+test@example.com'
    ]

    invalid_email_addresses.each { |email| expect(Fabricate.build(:user, email: email)).to_not be_valid }
    valid_email_addresses.each { |email| expect(Fabricate.build(:user, email: email)).to be_valid }
  end

  it "populates .image with gravatar link before saving if no image is provided" do
    user = Fabricate(:user, { email: "MyEmailAddress@example.com", image: nil })
    expect(user.image).to eq("https://www.gravatar.com/avatar/0bc83cb571cd1c50ba6f3e8a78ef1346")
  end
end
