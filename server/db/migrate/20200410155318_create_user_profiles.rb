class CreateUserProfiles < ActiveRecord::Migration[6.0]
  def change
    create_table :user_profiles do |t|
      t.string :user_name
      t.string :photo_url
      t.string :industry
      t.string :nickname
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
