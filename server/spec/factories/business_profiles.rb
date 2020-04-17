# == Schema Information
#
# Table name: business_profiles
#
#  id          :bigint           not null, primary key
#  address1    :string
#  address2    :string
#  city        :string
#  description :text
#  industry    :string
#  logo_url    :string
#  name        :string
#  state       :string
#  zip         :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_business_profiles_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
FactoryBot.define do
  factory :business_profile do
    name { Faker::Company.name }
    industry { BusinessProfile::Industry::COSMETOLOGY }
    logo_url { Faker::Internet.url }
    description { Faker::Company.catch_phrase }
    address1 { Faker::Address.street_address }
    address2 { Faker::Address.secondary_address }
    city { Faker::Address.city }
    state { State::OHIO }
    zip { Faker::Address.zip_code }
    user
  end
end
