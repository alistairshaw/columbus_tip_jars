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
