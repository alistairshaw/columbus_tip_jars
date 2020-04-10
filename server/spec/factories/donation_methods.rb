FactoryBot.define do
  factory :donation_method do
    user_profile { create(:user_profile) }
    business_profile { create(:business_profile) }
    vendor_name { "Venmo" }
    vendor_id { "@fake-user-venmo" }
  end
end
