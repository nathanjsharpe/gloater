class ApplicationController < ActionController::API
  include Pundit

  def current_user
    @current_user ||= ApiToken.find_by(token: request.headers["Authorization"]).try(:user)
  end
end
