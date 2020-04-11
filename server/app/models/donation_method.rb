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
