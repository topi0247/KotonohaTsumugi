class Api::V1::Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    super { |resource| resource.remember_me = true }
  end

  private

  def sign_up_params
    params.permit(:email, :password, :name)
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
