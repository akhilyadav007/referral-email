class User < ApplicationRecord
  require "securerandom"
  has_secure_password
end
