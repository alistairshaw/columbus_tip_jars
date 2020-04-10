FactoryBot.define do
  factory :business_user_profile do
    business_profile { create(:business_profile) }
    user_profile { creaet(:user_profile) }
  end
end
