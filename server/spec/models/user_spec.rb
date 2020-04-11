RSpec.describe User, type: :model do
  it { should validate_presence_of(:email) }
  it { should validate_uniqueness_of(:email).case_insensitive }
  it { should have_secure_password }
  it { should have_many(:auth_tokens) }
  it { should have_many(:user_profiles) }
  it { should have_many(:business_profiles) }
end
