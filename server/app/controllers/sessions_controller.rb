class SessionsController < ApplicationController
  def create
    credentials = User.new(user_params)
    @user = User.find_by(email: credentials.email).try(:authenticate, credentials.password)

    if @user
      @api_token = ApiToken.create(user: @user)
      render json: @api_token, status: :created, location: @user
    else
      render json: { error: "Invalid email or password." }, status: :unauthorized
    end
  end

  private
    def user_params
      params.require(:user).permit(:email, :password)
    end
end
