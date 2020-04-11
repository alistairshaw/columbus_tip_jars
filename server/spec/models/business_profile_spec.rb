RSpec.describe BusinessProfile, type: :model do
  it { should belong_to(:user) }
  it { should have_many(:donation_methods).dependent(:destroy) }
end
