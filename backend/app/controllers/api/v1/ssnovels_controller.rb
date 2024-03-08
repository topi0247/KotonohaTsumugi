class Api::V1::SsnovelsController < ApplicationController
  def index
    @ssnovels = Ssnovel.all
    render json: @ssnovels
  end

  def show
    ssnovel = Ssnovel.includes(:ssnovel_bodies).find(params[:id])
    render json: ssnovel.as_json(include: :ssnovel_bodies)
  end

  def create
    ssnovel = Ssnovel.new(ssnovel_params)
    if ssnovel.save
      render json: { message: 'Ssnovel created successfully' }, status: :created
    else
      render json: { error: 'Failed to create ssnovel' }, status: :unprocessable_entity
    end
  end

  private

  def ssnovel_params
    params.permit(:title)
  end
end
