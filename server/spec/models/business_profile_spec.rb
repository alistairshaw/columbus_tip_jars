# == Schema Information
#
# Table name: business_profiles
#
#  id          :bigint           not null, primary key
#  address1    :string
#  address2    :string
#  city        :string
#  description :text
#  industry    :string
#  logo_url    :string
#  name        :string
#  state       :string
#  zip         :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_business_profiles_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
RSpec.describe BusinessProfile, type: :model do
  it { should belong_to(:user) }
  it { should have_many(:donation_methods).dependent(:destroy) }
end
