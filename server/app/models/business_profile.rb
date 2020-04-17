# == Schema Information
#
# Table name: business_profiles
#
#  id          :bigint           not null, primary key
#  address1    :string
#  address2    :string
#  city        :string
#  description :text
#  industry    :string
#  logo_url    :string
#  name        :string
#  state       :string
#  zip         :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_business_profiles_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class BusinessProfile < ApplicationRecord
  belongs_to :user
  has_many :donation_methods, as: :profile, dependent: :destroy

  module Industry
    ALL = [
      COSMETOLOGY = "cosmetology".freeze
    ].freeze
  end

  validates :name, presence: true
  validates :industry, presence: true, inclusion: { in: Industry::ALL }
  validates :state, inclusion: { in: State::ALL, allow_nil: true }
end
