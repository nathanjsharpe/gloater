=begin
  @apiDefine GloatObject

  @apiSuccess {Number} gloat.id Gloat's unique id
  @apiSuccess {String} gloat.content Content (body) of the gloat
  @apiSuccess {String} gloat.created_at Time gloat created (ISO8601 date string)
  @apiSuccess {String} gloat.updated_at Last time gloat was updated (ISO8601 date string)
  @apiSuccess {Number} gloat.admirers_count Number of users that have admired the gloat
  @apiSuccess {Boolean} gloat.admired Whether the user making the request has admired the gloat. Not included if: 1) valid authorization token not provided, or 2) the gloat was created by the current user
  @apiSuccess {Object} user User who authored of the gloat
  @apiSuccess {String} user.username Username of author
  @apiSuccess {String} user.name Name of author
  @apiSuccess {String} user.image Url of author's profile image
=end

class GloatSerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at, :updated_at, :admirers_count
  attribute :admired, if: -> { scope && scope.id != object.user_id }

  def admired
    scope.admired_gloats.include?(object)
  end

  belongs_to :user

  class UserSerializer < ActiveModel::Serializer
    attributes :username, :name, :image
  end
end
