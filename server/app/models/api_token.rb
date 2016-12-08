require 'securerandom'

class ApiToken < ApplicationRecord
  has_secure_token

  belongs_to :user

  before_create :set_values

  private

    def set_values
      self.expires_at = Time.now + 30.days
    end
end
