class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :city, :state, :profession, :company
end
