FactoryBot.define do
  factory :business_profile do
    name { "Fake Business LLC" }
    industry { "Some Indusry" }
    logo_url { "www.fake-business.url" }
    description { "Description of my fake business is here." }
    address1 { "123 E Main St" }
    address2 { "Apt 101" }
    city { "Columbus" }
    state { "OH" }
    zip { 43214 }
    user
  end
end
