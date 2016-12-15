class AdmiresController < ApplicationController
  before_action :authenticate!
  before_action :set_gloat, only: [:create, :destroy]

  def index
    @gloats = current_user.admired_gloats

    render json: @gloats
  end

  def create
    current_user.admired_gloats << @gloat
    current_user.save
    @gloat.reload

    render json: @gloat
  end

  def destroy
    current_user.admired_gloats.delete(@gloat)
    current_user.save
  end

  private

    def set_gloat
      @gloat = Gloat.find(params[:gloat_id])
    end
end
