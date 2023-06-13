class UserService
  def self.register(params)
      user = User.new(params)
      if user.save
        user
      else
        user.errors.full_messages
      end
    end

    def self.login(email, password)
      user = User.find_by(email: email)
      if user && user.authenticate(password)
        JsonWebToken.encode(user_id: user.id)
      else
        raise 'Login failed: email number or password is incorrect'
      end
    end
end