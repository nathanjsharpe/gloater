require 'rails_helper'

RSpec.describe Stalk, type: :model do
  it { should belong_to :user }
  it { should belong_to(:stalked).counter_cache(:stalkers_count) }
end
