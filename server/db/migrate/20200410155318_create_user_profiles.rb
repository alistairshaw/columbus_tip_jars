class CreateUserProfiles < ActiveRecord::Migration[6.0]
  def change
    create_table :user_profiles do |t|
      t.string :user_name
      t.string :photo_url
      t.string :industry
      t.string :nickname
      t.belongs_to :user, null: false, foreign_key: true
      t.uuid :user_id

      t.timestamps
    end
  end
end
