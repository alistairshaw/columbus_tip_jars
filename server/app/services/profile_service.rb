class ProfileService
  def self.create_business_profile(business_profile_params)
    business_profile = BusinessProfile.new(business_profile_params)
    OpenStruct.new(success?: business_profile.save, business_profile: business_profile)
  end

  def self.update_business_profile(business_profile_id, business_profile_params)
    business_profile = BusinessProfile.find(business_profile_id)
    business_profile.update(business_profile_params)
    OpenStruct.new(success?: business_profile.save, business_profile: business_profile)
  end

  def self.create_user_profile(user_profile_params)
    user_profile = UserProfile.new(user_profile_params)
    OpenStruct.new(success?: user_profile.save, user_profile: user_profile)
  end

  def self.update_user_profile(user_profile_id, user_profile_params)
    user_profile = UserProfile.find(user_profile_id)
    user_profile.update(user_profile_params)
    OpenStruct.new(success?: user_profile.save, user_profile: user_profile)
  end
end
