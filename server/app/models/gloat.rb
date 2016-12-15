class Gloat < ApplicationRecord
  validates :content,
    presence: true,
    length: { maximum: 140 }

  belongs_to :user
  has_and_belongs_to_many :admirers,
    class_name: 'User',
    join_table: :admires,
    inverse_of: :admired_gloats
end
