RSpec.describe BusinessProfile, type: :model do
  it { should belong_to(:user) }
end
