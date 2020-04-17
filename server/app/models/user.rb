# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string
#  password_digest :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email  (email) UNIQUE
#
class User < ApplicationRecord
  has_many :auth_tokens, dependent: :destroy
  has_many :business_profiles, dependent: :destroy
  has_many :user_profiles, dependent: :destroy

  has_secure_password

  validates :email, presence: true, uniqueness: { case_sensitive: false }
end
