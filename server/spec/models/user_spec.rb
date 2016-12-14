require 'rails_helper'

RSpec.describe User, type: :model do
  it "is valid with valid attributes" do
    expect(Fabricate.build(:user)).to be_valid
  end

  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:username) }
  it { should validate_uniqueness_of(:username) }
  it { should validate_length_of(:username).is_at_least(3) }
  it { should validate_presence_of(:name) }
  it { should validate_length_of(:name).is_at_least(3) }
  it { should have_secure_password }
  it { should have_many :api_tokens }

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
end
