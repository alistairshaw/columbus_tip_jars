class ApiController < ApplicationController
  rescue_from ActionController::ParameterMissing, with: :render_exception

  def render_exception(exception)
    render :json => {}, :status => :unprocessable_entity
  end
end
