require 'rails_helper'

RSpec.describe ApiToken, type: :model do
  it { should validate_uniqueness_of :token }
  it { should belong_to :user }
end
