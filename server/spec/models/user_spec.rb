require 'rails_helper'

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

  it { should have_and_belong_to_many :admired_gloats }
  it { should have_and_belong_to_many :stalkers }
  it { should have_and_belong_to_many :stalked_users }
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
