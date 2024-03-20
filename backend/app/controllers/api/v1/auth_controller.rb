class Api::V1::AuthController < ApplicationController
  skip_before_action :authenticate_user!
  def logged_in
    if user_signed_in?
      render json: { logged_in: true, user: current_user }
    else
      render json: { logged_in: false }
    end
  end
end