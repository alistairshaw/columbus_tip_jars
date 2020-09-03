# == Schema Information
#
# Table name: user_profile_videos
#
#  id              :bigint           not null, primary key
#  blurb           :string
#  video_url       :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  user_profile_id :bigint           not null
#
# Indexes
#
#  index_user_profile_videos_on_user_profile_id  (user_profile_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_profile_id => user_profiles.id)
#
class UserProfileVideo < ApplicationRecord
  belongs_to :user_profile

end
