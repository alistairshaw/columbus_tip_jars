FactoryBot.define do
  factory :auth_token do
    token { SecureRandom.uuid }
    user
  end
end
