class Users::GloatsController < ApplicationController
  before_action :authenticate!, only: [:create, :update, :destroy]
  before_action :set_user

  # GET /gloats
  def index
    @gloats = @user.gloats

    if params[:sort] == "popularity"
      @gloats = @gloats.order(admirers_count: :desc)
    else
      @gloats = @gloats.order(created_at: :desc)
    end

    if params[:admired]
      authenticate!
      @gloats = @gloats.where(id: current_user.admired_gloat_ids)
    end

    render json: @gloats
  end

  private
    def set_user
      @user = User.find_by(username: params[:id])
    end
end
