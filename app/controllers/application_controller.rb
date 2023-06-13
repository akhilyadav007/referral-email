class ApplicationController < ActionController::Base
  protect_from_forgery
  helper_method :current_user
  
  def not_found
    render json: { errors: ['not_found'] }
  end
  
  def authenticate_request
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    begin
      @decoded = JsonWebToken.decode(header)
      @current_user = User.find(@decoded[:user_id])
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: [e.message] }, status: :unauthorized
    rescue JWT::DecodeError => e
      render json: { errors: [e.message] }, status: :unauthorized
    end
  end

  def current_user
    debugger
    current_user ||= @current_user
  end
end
