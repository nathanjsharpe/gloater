class GloatSerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at, :updated_at
  attribute :admired, if: -> { scope && scope.id != object.user_id }

  def admired
    scope.admired_gloats.include?(object)
  end

  belongs_to :user

  class UserSerializer < ActiveModel::Serializer
    attributes :username, :name, :image
  end
end
