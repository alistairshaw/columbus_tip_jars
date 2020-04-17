# == Schema Information
#
# Table name: donation_methods
#
#  id           :bigint           not null, primary key
#  profile_type :string           not null
#  vendor_name  :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  profile_id   :bigint           not null
#  vendor_id    :string
#
# Indexes
#
#  index_donation_methods_on_profile_type_and_profile_id  (profile_type,profile_id)
#
class DonationMethod < ApplicationRecord
  belongs_to :profile, polymorphic: true

  module VendorNames
    ALL = [
      PATREON = "patreon".freeze,
      VENMO = "venmo".freeze,
      CASH_APP = "cash_app".freeze,
      PAYPAL = "paypal".freeze
    ].freeze
  end

  validates :vendor_name, presence: true, inclusion: { in: VendorNames::ALL }
  validates :vendor_id, presence: true
end
