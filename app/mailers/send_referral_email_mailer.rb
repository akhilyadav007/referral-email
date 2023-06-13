class SendReferralEmailMailer < ApplicationMailer
  default from: 'me@example.com'

  def referral_email
    user_email = params[:user][:email]
    # @user = params[:user]
    mail(to: user_email, subject: 'Welcome to My Awesome Site')
  end
end
