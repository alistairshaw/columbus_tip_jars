class User < ApplicationRecord
  has_many :auth_tokens, dependent: :destroy
  has_many :business_profiles, dependent: :destroy
  has_many :user_profiles, dependent: :destroy

  has_secure_password

  validates :email, presence: true, uniqueness: { case_sensitive: false }
end
