class UserCompleteSerializer < ActiveModel::Serializer
  attributes :id, :email, :city, :state, :profession, :company, :created_at, :image, :stalked, :username
  attribute :stalked, if: -> { scope && scope != object }

  has_many :gloats

  def stalked
    scope.stalked_users.include?(object)
  end

end
