RSpec.describe AuthToken, type: :model do
  it { should have_secure_token(:token) }
  it { should belong_to(:user) }
  it { should validate_presence_of(:user_id) }
end
