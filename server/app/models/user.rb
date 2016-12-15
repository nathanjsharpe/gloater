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

  has_many :api_tokens
  has_and_belongs_to_many :admired_gloats,
    class_name: 'Gloat',
    join_table: :admires,
    inverse_of: :admirers

  # TODO: is there a way to define both in one statement?
  has_and_belongs_to_many :stalkers,
    class_name: 'User',
    join_table: :stalks,
    inverse_of: :stalked_users,
    foreign_key: :stalked_id,
    association_foreign_key: :stalker_id
  has_and_belongs_to_many :stalked_users,
    class_name: 'User',
    join_table: :stalks,
    inverse_of: :stalkers,
    foreign_key: :stalker_id,
    association_foreign_key: :stalked_id
end
