class ProfileService
  def self.create_business_profile(business_profile_params)
    business_profile = BusinessProfile.new(business_profile_params)
    OpenStruct.new(success?: business_profile.save, business_profile: business_profile)
  end
end
