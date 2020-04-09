class AuthenticationService
  def self.register(email:, password:)
    user = User.new(email: email, password: password)

    if user.save
      user.auth_tokens.create!

      OpenStruct.new(:user => user, :success? => true)
    else
      OpenStruct.new(:user => user, :success? => false)
    end
  end
end
