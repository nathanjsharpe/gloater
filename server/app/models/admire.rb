class Admire < ApplicationRecord
  belongs_to :user
  belongs_to :gloat, counter_cache: :admirers_count
end
