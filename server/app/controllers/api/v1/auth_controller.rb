class Api::V1::AuthController < ApiController
  def register
    result = AuthenticationService.register(
      email: user_params[:email],
      password: user_params[:password]
    )

    if result.success?
      render json: { errors: [], resource: result.user }, status: :created
    else
      render json: { errors: result.user.errors.full_messages, resource: nil }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password).to_h.deep_symbolize_keys
  end
end
