class UsersController < ActionController::Base
  protect_from_forgery
  before_action :set_user_params, only: [:registration, :update]
  before_action :set_user, only: [:login]
  
  
  def registration
      user = UserService.register(new_user_params)
      render json: user, status: 200
  rescue => e
      render json: { errors: e.message }, status: 422
  end
  
  def login
      token = UserService.login(params[:email], params[:password])
      render json: { token: token }, status: :ok
  rescue => e
      render json: { errors: e.message }, status: 400
  end

  def current_user
    return @current_user if defined?(@current_user)
    jwt_token = request.headers['Authorization']&.split(' ')&.last
    return unless jwt_token
    payload = JWT.decode(jwt_token, Rails.application.credentials.secret_key_base)[0]
    @current_user = User.find_by_id(payload['user_id'])
  rescue JWT::ExpiredSignature, JWT::DecodeError
    nil
  end

  private

  def set_user_params
      @user_params ||= ActionController::Parameters.new(
        user: {
          first_name: params[:first_name],
          last_name: params[:last_name],
          email: params[:email],
          password: params[:password],
          password_confirmation: params[:password_confirmation]
        }
      )
    end
    def new_user_params
      @user_params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end

  def set_user
      @user = User.find_by(email: params[:email])
      if @user.nil?
        render json: { errors: ['Contact number or password is incorrect'] }, status: 400
      end
    end
end