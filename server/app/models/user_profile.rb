# == Schema Information
#
# Table name: user_profiles
#
#  id         :bigint           not null, primary key
#  industry   :string
#  nickname   :string
#  photo_url  :string
#  user_name  :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_user_profiles_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class UserProfile < ApplicationRecord
  belongs_to :user
  has_many :donation_methods, as: :profile, dependent: :destroy
end
