class HomeController < ApplicationController
    before_action :authenticate_request, only: [:index, :send_referral_email]
    
    def index
        referral_emails = ReferralEmail.where(user_id: @current_user&.id)
        render json: referral_emails, status: 200
    rescue => e
        render json: { errors: e.message }, status: 422
    end

    def send_referral_email
        ReferralEmail.create(user_id: @current_user&.id, email:params[:email])
        SendReferralEmailMailer.with(user: {email: params[:email]}).referral_email.deliver_now
    end
end
  