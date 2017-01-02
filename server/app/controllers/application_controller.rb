class ApplicationController < ActionController::API
  include Pundit

  class AuthenticationError < StandardError; end

  rescue_from Pundit::NotAuthorizedError, with: :unauthorized
  rescue_from AuthenticationError, with: :unauthenticated

  def authenticate!
    raise AuthenticationError if !current_user
  end

  def current_user
    @current_user ||= ApiToken.find_by(token: request.headers["HTTP_AUTHORIZATION"]).try(:user)
  end

  private

  def unauthorized
    render json: { error: "Unauthorized" }, status: 403
  end

  def unauthenticated
    render json: { error: "Invalid api token" }, status: 401
  end
end
