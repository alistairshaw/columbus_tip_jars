class AddFieldsToUserProfile < ActiveRecord::Migration[6.0]
  def change
    add_column :user_profiles, :business_name, :string, :after => :user_name
    add_column :user_profiles, :specialty, :string, :after => :user_name
    add_column :user_profiles, :tip_url, :string, :after => :user_name
    add_column :user_profiles, :video_url, :string, :after => :user_name
    add_column :user_profiles, :blurb, :text, :after => :user_name
    remove_column :user_profiles, :photo_url, :string
  end
end
