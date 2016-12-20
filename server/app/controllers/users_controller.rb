class UsersController < ApplicationController
  include PaginatedResponse
  before_action :set_user, only: [:show, :update, :destroy, :gloats]

  def index
    @users = User.all

    if params[:sort] == "popularity"
      @users = @users.order(stalkers_count: :desc)
    else
      @users = @users.order(created_at: :desc)
    end

    if params[:stalked]
      authenticate!
      @users = @users.where(id: current_user.stalked_user_ids)
    end

    render json: @users.page(params[:page])
  end

  # GET /users/1
  def show
    render json: @user, serializer: UserCompleteSerializer
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  def gloats
    render json: @user.gloats
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.includes(:gloats).find_by(username: params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation, :image, :name, :username, :city, :state, :profession, :company)
    end
end
