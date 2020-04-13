25.times do
  FactoryBot.create(:user_profile, user: FactoryBot.create(:user, password: "test")).tap do |profile|
    rand(0..5).times do
      FactoryBot.create(:donation_method, profile: profile)
    end
  end
end

15.times do
  FactoryBot.create(:business_profile, user: FactoryBot.create(:user, password: "test"))
end
