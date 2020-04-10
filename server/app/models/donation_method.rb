class DonationMethod < ApplicationRecord
  belongs_to :profile, polymorphic: true
end
