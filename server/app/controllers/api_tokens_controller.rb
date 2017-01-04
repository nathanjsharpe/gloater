class ApiTokensController < ApplicationController
=begin
  @api {post} /api_token Create api token using user credentials
  @apiName CreateApiToken
  @apiGroup ApiToken

  @apiParam {Object} user The user you want to create a token for
  @apiParam {String} user.email User's email address
  @apiParam {String} user.password User's password

  @apiSuccess {String} token The token to be passed as authorization header
  @apiSuccess {String} expires_at Time at which the token expires
  @apiSuccess {Object} user The user to whom the token belongs
  @apiUse UserObject
=end
  def create
    credentials = User.new(user_params)
    @user = User
      .includes(:gloats)
      .find_by(email: credentials.email)
      .try(:authenticate, credentials.password)

    if @user
      @api_token = ApiToken.create(user: @user)
      render json: @api_token, status: :created
    else
      render json: { error: "Invalid email or password." }, status: :unauthorized
    end
  end

  def destroy
    authenticate!
    @api_token = ApiToken.find_by(token: request.headers["HTTP_AUTHORIZATION"])
    @api_token.destroy
  end

  private
    def user_params
      params.require(:user).permit(:email, :password)
    end
end
