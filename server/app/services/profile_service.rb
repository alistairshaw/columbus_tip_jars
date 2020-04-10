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
end
