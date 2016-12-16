require 'securerandom'

class ApiToken < ApplicationRecord
  has_secure_token

  belongs_to :user

  before_create :set_values

  default_scope { includes(user: [:admired_gloats, :stalked_users]) }

  private

    def set_values
      self.expires_at = Time.now + 30.days
    end
end
