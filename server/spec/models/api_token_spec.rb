require 'rails_helper'

RSpec.describe ApiToken, type: :model do
  it { should belong_to :user }

  it "sets expires_at before creation" do
    api_token = Fabricate(:api_token)
    expect(api_token.expires_at).to be_kind_of(Time)
  end

  it "sets secure token on creation" do
    api_token = Fabricate(:api_token)
    expect(api_token.token).to be_kind_of(String)
  end
end
