class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :city, :state, :profession, :company, :created_at, :image, :stalked
  attribute :stalked, if: -> { scope && scope != object }

  def stalked
    scope.stalked_users.include?(object)
  end
end
