class CreateUserProfileVideos < ActiveRecord::Migration[6.0]
  def change
    create_table :user_profile_videos do |t|
      t.string :video_url
      t.string :blurb
      t.references :user_profile, null: false, foreign_key: true

      t.timestamps
    end
  end
end
