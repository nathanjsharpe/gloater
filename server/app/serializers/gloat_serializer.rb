class GloatSerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at, :updated_at

  belongs_to :user

  class UserSerializer < ActiveModel::Serializer
    attributes :username, :name
  end
end
