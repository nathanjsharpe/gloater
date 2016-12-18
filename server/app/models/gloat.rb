class Gloat < ApplicationRecord
  validates :content,
    presence: true,
    length: { maximum: 140 }

  belongs_to :user
  has_many :admires,
    dependent: :destroy
  has_many :admirers,
    through: :admires,
    source: :user
end
