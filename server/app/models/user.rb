class User < ApplicationRecord
  has_secure_password

  validates :username,
    presence: true,
    uniqueness: { case_sensitive: false },
    length: { minimum: 3 }

  validates :name,
    presence: true,
    length: { minimum: 3 }

  validates :email,
    presence: true,
    uniqueness: { case_sensitive: false },
    # Incredibly naive email regex that serves little purpose other than to say "I'm aware of format validation!"
    format: { with: /\A\S+@\S+\z/, message: "must be a valid email address" }

  has_many :gloats

  has_many :api_tokens

  has_many :admires
  has_many :admired_gloats,
    through: :admires,
    source: :gloat

  has_many :stalks, foreign_key: :stalker_id
  has_many :stalkers,
    through: :stalks,
    source: :user,
    dependent: :destroy
  has_many :stalked_users,
    through: :stalks,
    source: :stalked,
    dependent: :destroy
end
