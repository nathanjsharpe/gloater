class ApplicationController < ActionController::API
  include Pundit

  rescue_from Pundit::NotAuthorizedError, with: :unauthorized

  def authenticate!
    if !current_user
      render json: { error: "Invalid api token" }, status: 401
    end
  end

  def current_user
    @current_user ||= ApiToken.find_by(token: request.headers["HTTP_AUTHORIZATION"]).try(:user)
  end

  private

  def unauthorized
    render json: { error: "Unauthorized" }, status: 403
  end
end
