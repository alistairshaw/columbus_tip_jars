FactoryBot.define do
  factory :user_profile do
    user_name { "FakeUserName1" }
    photo_url { "www.my-fake-photo.com" }
    industry { "Fake Industry" }
    nickname { "Fake Nickname" }
    user { create(:user) }
    user_id { user.id }
  end
end
