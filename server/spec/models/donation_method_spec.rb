RSpec.describe DonationMethod, type: :model do
  it { should belong_to(:profile) }
  it { should validate_inclusion_of(:vendor_name).in_array(described_class::VendorNames::ALL) }
  it { should validate_presence_of(:vendor_id) }
end
