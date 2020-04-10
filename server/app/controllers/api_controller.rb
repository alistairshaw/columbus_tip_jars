class ApiController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :authenticate

  rescue_from ActionController::ParameterMissing, with: :render_exception

  def render_exception(_exception)
    render json: {}, status: :unprocessable_entity
  end

  def authenticate
    authenticate_token || unauthorized
  end

  def authenticate_token
    authenticate_with_http_token do |token, _options|
      AuthToken.find_by(token: token)&.user
    end
  end

  def current_user
    @current_user ||= authenticate_token
  end

  def unauthorized
    render json: {}, status: :unauthorized
  end
end
