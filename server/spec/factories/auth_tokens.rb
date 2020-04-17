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
FactoryBot.define do
  factory :auth_token do
    token { SecureRandom.uuid }
    user
  end
end
