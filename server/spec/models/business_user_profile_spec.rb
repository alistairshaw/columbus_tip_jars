# == Schema Information
#
# Table name: business_user_profiles
#
#  id                  :bigint           not null, primary key
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  business_profile_id :bigint           not null
#  user_profile_id     :bigint           not null
#
# Indexes
#
#  index_business_user_profiles_on_business_profile_id  (business_profile_id)
#  index_business_user_profiles_on_user_profile_id      (user_profile_id)
#
# Foreign Keys
#
#  fk_rails_...  (business_profile_id => business_profiles.id)
#  fk_rails_...  (user_profile_id => user_profiles.id)
#
RSpec.describe BusinessUserProfile, type: :model do
  it { should belong_to(:user_profile) }
  it { should belong_to(:business_profile) }
end
