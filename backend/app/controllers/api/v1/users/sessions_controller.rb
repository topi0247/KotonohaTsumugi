class Api::V1::Users::SessionsController < Devise::SessionsController
  skip_before_action :authenticate_user!

  respond_to :json

  def create
    user = User.find_by(email: sign_in_params[:email])
    if user && user.valid_password?(sign_in_params[:password])
      sign_in(user)
      respond_with(user)
    else
      render json: {
        status: 401,
        message: "Invalid email or password."
      }, status: :unauthorized
    end
  end

  def destroy
    respond_to_on_destroy
  end

  private

  def sign_in_params
    params.require(:session).permit(:email, :password)
  end

  def respond_with(resource, _opts = {})
    render json: {
      status: {code: 200, message: 'Logged in sucessfully.'},
      data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
    }, status: :ok
  end

  def respond_to_on_destroy
    if current_user
      sign_out(current_user)
      render json: {
        status: 200,
        message: "logged out successfully"
      }, status: :ok
    else
      render json: {
        status: 401,
        message: "Couldn't find an active session."
      }, status: :unauthorized
    end
  end
end