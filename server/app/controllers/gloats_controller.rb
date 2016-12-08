class GloatsController < ApplicationController
  before_action :set_gloat, only: [:show, :update, :destroy]

  # GET /gloats
  def index
    @gloats = Gloat.all

    render json: @gloats
  end

  # GET /gloats/1
  def show
    render json: @gloat
  end

  # POST /gloats
  def create
    @gloat = Gloat.new(gloat_params)

    if @gloat.save
      render json: @gloat, status: :created, location: @gloat
    else
      render json: @gloat.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /gloats/1
  def update
    if @gloat.update(gloat_params)
      render json: @gloat
    else
      render json: @gloat.errors, status: :unprocessable_entity
    end
  end

  # DELETE /gloats/1
  def destroy
    @gloat.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_gloat
      @gloat = Gloat.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def gloat_params
      params.require(:gloat).permit(:content)
    end
end
