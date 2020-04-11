class BusinessUserProfile < ApplicationRecord
  belongs_to :business_profile
  belongs_to :user_profile
end
