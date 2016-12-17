=begin
  @apiDefine UserObject

  @apiSuccess {Number} user.id User's unique id
  @apiSuccess {String} user.email User's email addres
  @apiSuccess {String} user.city User's city
  @apiSuccess {String} user.state User's state
  @apiSuccess {String} user.profession User's profession
  @apiSuccess {String} user.company User's company
  @apiSuccess {String} user.created_at Time user's account was created (ISO8601 date string)
  @apiSuccess {String} user.image URL of user's profile image
  @apiSuccess {Boolean} user.stalked Whether the user making the request is currently stalking this user. Not included if: 1) valid authorization token not provided, or 2) the user object represents the current user
=end

class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :city, :state, :profession, :company, :created_at, :image, :stalked
  attribute :stalked, if: -> { scope && scope != object }

  def stalked
    scope.stalked_users.include?(object)
  end
end
