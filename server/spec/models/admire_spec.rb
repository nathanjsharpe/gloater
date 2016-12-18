require 'rails_helper'

RSpec.describe Admire, type: :model do
  it { should belong_to :user }
  it { should belong_to(:gloat).counter_cache(:admirers_count) }
end
