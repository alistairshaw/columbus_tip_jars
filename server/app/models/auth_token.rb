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
class AuthToken < ApplicationRecord
  belongs_to :user
  has_secure_token :token

  validates :user_id, presence: true
end
