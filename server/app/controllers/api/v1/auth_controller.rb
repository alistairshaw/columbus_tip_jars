module Api
  module V1
    class AuthController < ApiController
      skip_before_action :authenticate, only: %i[register login]

      def me
        render json: { errors: [], resource: current_user }, status: :ok
      end

      def register
        result = AuthenticationService.register(email: user_params[:email], password: user_params[:password])

        if result.success?
          render json: { errors: [], resource: result.user, auth_token: result.user.auth_tokens.first.token }, status: :created
        else
          render json: { errors: result.user.errors.full_messages, resource: nil, auth_token: nil }, status: :unprocessable_entity
        end
      end

      def login
        result = AuthenticationService.login(email: user_params[:email], password: user_params[:password])

        if result.success?
          render json: { errors: [], resource: result.user, auth_token: result.user.auth_tokens.first.token }, status: :ok
        else
          render json: { errors: [I18n.t!("invalid_email_or_password")], resource: nil, auth_token: nil }, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.require(:user).permit(:email, :password).to_h.deep_symbolize_keys
      end
    end
  end
end
