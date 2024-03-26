class Api::V1::SsnovelsController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[index show]

  def index
    @ssnovels = Ssnovel.includes(ssnovel_bodies: :user).all.order(updated_at: :desc)
    render json: @ssnovels.map(&:as_custom_json)
  end

  def show
    ssnovel = Ssnovel.includes(ssnovel_bodies: :user).find(params[:id])
    render json: ssnovel.as_custom_json
  end

  def user_ssnovels
    @ssnovels = current_user.ssnovels.includes(ssnovel_bodies: :user)
  render json: @ssnovels.map(&:as_custom_json)
  end

  private

  def ssnovel_params
    params.permit(:title)
  end
end
