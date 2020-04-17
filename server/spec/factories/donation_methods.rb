# == Schema Information
#
# Table name: donation_methods
#
#  id           :bigint           not null, primary key
#  profile_type :string           not null
#  vendor_name  :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  profile_id   :bigint           not null
#  vendor_id    :string
#
# Indexes
#
#  index_donation_methods_on_profile_type_and_profile_id  (profile_type,profile_id)
#
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
