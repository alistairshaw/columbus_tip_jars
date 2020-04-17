# == Schema Information
#
# Table name: donation_methods
#
#  id           :bigint           not null, primary key
#  profile_type :string           not null
#  vendor_name  :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  profile_id   :bigint           not null
#  vendor_id    :string
#
# Indexes
#
#  index_donation_methods_on_profile_type_and_profile_id  (profile_type,profile_id)
#
RSpec.describe DonationMethod, type: :model do
  it { should belong_to(:profile) }
  it { should validate_inclusion_of(:vendor_name).in_array(described_class::VendorNames::ALL) }
  it { should validate_presence_of(:vendor_id) }
end
