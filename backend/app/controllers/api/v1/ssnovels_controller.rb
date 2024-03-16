class Api::V1::SsnovelsController < ApplicationController
  def index
    @ssnovels = Ssnovel.includes(ssnovel_bodies: :user).all
    render json: @ssnovels.map(&:as_custom_json)
  end

  def show
    ssnovel = Ssnovel.includes(ssnovel_bodies: :user).find(params[:id])
    render json: ssnovel.as_custom_json
  end

  def create
    
  end

  private

  def ssnovel_params
    params.permit(:title)
  end
end
