class Stalk < ApplicationRecord
  belongs_to :user,
    foreign_key: :stalker_id
  belongs_to :stalked,
    class_name: 'User',
    counter_cache: :stalkers_count
end
