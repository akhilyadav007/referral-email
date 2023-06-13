class CreateReferralEmails < ActiveRecord::Migration[7.0]
  def change
    create_table :referral_emails do |t|
      t.string :user_id
      t.string :email

      t.timestamps
    end
  end
end
