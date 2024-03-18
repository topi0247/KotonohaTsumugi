class Api::V1::Users::CurrentUserController < ApplicationController
  skip_before_action :authenticate_user!
  def index
    render json: current_user, status: :ok
  end
end