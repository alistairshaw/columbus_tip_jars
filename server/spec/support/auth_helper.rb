module AuthHelper
  NoTokenForUserError = Class.new(StandardError)

  def login_user(user)
    raise NoTokenForUserError if user.auth_tokens.size.zero?

    login_with_token(user.auth_tokens.first.token)
  end

  def login_with_token(token)
    return unless token

    request.env["HTTP_AUTHORIZATION"] = "Bearer #{token}"
  end
end
