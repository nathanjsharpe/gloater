class ApiToken < ApplicationRecord
  validates :token,
    uniqueness: true

  belongs_to :user
end
