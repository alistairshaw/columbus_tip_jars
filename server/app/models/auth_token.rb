class AuthToken < ApplicationRecord
  belongs_to :user
  has_secure_token :token

  validates :user_id, presence: true
end
