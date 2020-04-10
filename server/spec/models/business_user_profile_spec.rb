RSpec.describe BusinessUserProfile, type: :model do
  it { should belong_to(:user_profile) }
  it { should belong_to(:business_profile) }
end
