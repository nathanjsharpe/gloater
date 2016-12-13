class ApplicationController < ActionController::API
  def current_user
    @current_user ||= ApiToken.find_by(token: request.headers["Authorization"]).try(:user)
  end
end
