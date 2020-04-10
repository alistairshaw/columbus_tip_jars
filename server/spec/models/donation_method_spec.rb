RSpec.describe DonationMethod, type: :model do
  it { should belong_to(:profile).polymorphic }
end
