class Api::V1::SsnovelBodiesController < ApplicationController
  def create
    ssnovel_body = SsnovelBody.new(content: ssnovel_body_params[:content], narrative_stage: ssnovel_body_params[:narrative_stage])
    ssnovel_body.user = current_user

    # リファクタリングはあと
    if ssnovel_body_params[:title].present?
      ssnovel = Ssnovel.find_or_create_by(title: ssnovel_body_params[:title])
    else
      ssnovel = Ssnovel.find(ssnovel_body_params[:ssnovel_id])
    end

    ssnovel_body.ssnovel = ssnovel

    if ssnovel_body.valid? && ssnovel_body.save
      render status: :created
    else
      render status: :bad_request
    end
  end

  private

  def ssnovel_body_params
    params.require(:ssnovel_body).permit(:content, :narrative_stage, :ssnovel_id, :title)
  end
end
