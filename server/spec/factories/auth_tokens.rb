FactoryBot.define do
  factory :auth_token do
    auth_token { SecureRandom.uuid }
    user
  end
end
