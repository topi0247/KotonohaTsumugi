class Api::V1::SsnovelBodyController < ApplicationController
  def create
    ssnovel_body = SsnovelBody.new(ssnovel_body_params)

    if ssnovel_body.save
      render json: { message: 'Ssnovel body created successfully' }, status: :created
    else
      render json: { error: 'Failed to create ssnovel body' }, status: :unprocessable_entity
    end
  end

  private

  def ssnovel_body_params
    params.permit(:content, :narrative_stage, :ssnovel_id, :user_id)
  end
end
