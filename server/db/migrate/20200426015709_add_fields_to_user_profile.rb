class AddFieldsToUserProfile < ActiveRecord::Migration[6.0]
  def change
    change_table :user_profiles, bulk: true do |t|
      t.string :business_name
      t.string :specialty
      t.string :tip_url
      t.string :video_url
      t.string :blurb
    end

    remove_column :user_profiles, :photo_url, :string
  end
end
