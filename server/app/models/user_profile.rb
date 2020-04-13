class UserProfile < ApplicationRecord
  belongs_to :user

  has_many_attached :images

  has_many :donation_methods, as: :profile, dependent: :destroy
end
