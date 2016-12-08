class ApiTokenSerializer < ActiveModel::Serializer
  attributes :id, :token, :expires_at
  has_one :user
end
