class StalksController < ApplicationController
  before_action :authenticate!
  before_action :set_user, only: [:create, :destroy]

  def index
    render json: current_user.stalked_users
  end

  def create
    current_user.stalked_users << @user
    current_user.save
    @user.reload

    render json: @user, serializer: UserCompleteSerializer
  end

  def destroy
    current_user.stalked_users.delete(@user)
    current_user.save
    @user.reload

    render json: @user, serializer: UserCompleteSerializer
  end

  private
    def set_user
      @user = User.find_by(username: params[:user_id])
    end
end
