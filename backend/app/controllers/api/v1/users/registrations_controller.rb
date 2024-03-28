class Api::V1::Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    super
    user = User.find_by(email: sign_up_params[:email])
    Rails.logger.info("============================")
    Rails.logger.info("User created: #{user}")
    Rails.logger.info("User persisted: #{user.persisted?}")
    Rails.logger.info("User errors: #{user.errors.full_messages}")
    Rails.logger.info("============================")
    sign_in user if user.persisted?
  end

  private

  def sign_up_params
    params.permit(:email, :password, :password_confirmation, :name)
  end

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: {
        status: {code: 200, message: 'Signed up sucessfully.'},
        data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
      }
    else
      render json: {
        status: {message: "User couldn't be created successfully. #{resource.errors.full_messages.to_sentence}"}
      }, status: :unprocessable_entity
    end
  end
end
