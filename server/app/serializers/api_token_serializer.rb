class ApiTokenSerializer < ActiveModel::Serializer
  attributes :token, :expires_at
  has_one :user
end
