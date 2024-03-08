class Api::V1::UserSessionsController < ApplicationController
  def create
    @user = User.find_by(email: user_params[:email])
    if @user&.authenticate(user_params[:password])
      render json: @user, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  def destroy
  end

  private

  def user_params
    params.permit(:email, :password)
  end

end
