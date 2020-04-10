class DonationMethod < ApplicationRecord
  belongs_to :user_profile, polymorphic: true
  belongs_to :business_profile, polymorphic: true
end
