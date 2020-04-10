class User < ApplicationRecord
  has_many :auth_tokens, dependent: :destroy
  has_secure_password

  validates :email, presence: true, uniqueness: { case_sensitive: false }
end
