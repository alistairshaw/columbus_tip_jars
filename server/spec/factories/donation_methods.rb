FactoryBot.define do
  factory :donation_method do
    profile { create(:user_profile) }
    vendor_name { DonationMethod::VendorNames::VENMO }
    vendor_id { "@fake-user-venmo" }

    trait :with_business_profile do
      profile { create(:business_profile) }
    end

    trait :with_user_profile do
      profile { create(:user_profile) }
    end
  end
end
