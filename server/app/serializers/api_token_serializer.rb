class ApiTokenSerializer < ActiveModel::Serializer
  attributes :token, :expires_at

  belongs_to :user
end
