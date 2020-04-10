class CreateBusinessUserProfiles < ActiveRecord::Migration[6.0]
  def change
    create_table :business_user_profiles do |t|
      t.references :business_profile, null: false, foreign_key: true
      t.references :user_profile, null: false, foreign_key: true

      t.timestamps
    end
  end
end
