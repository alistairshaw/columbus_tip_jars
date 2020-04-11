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
