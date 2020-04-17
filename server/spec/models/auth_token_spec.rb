# == Schema Information
#
# Table name: auth_tokens
#
#  id         :bigint           not null, primary key
#  token      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_auth_tokens_on_token    (token) UNIQUE
#  index_auth_tokens_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
RSpec.describe AuthToken, type: :model do
  it { should have_secure_token(:token) }
  it { should belong_to(:user) }
  it { should validate_presence_of(:user_id) }
end
