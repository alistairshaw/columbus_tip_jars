class CreateBusinessProfiles < ActiveRecord::Migration[6.0]
  def change
    create_table :business_profiles do |t|
      t.string :name
      t.string :industry
      t.string :logo_url
      t.text :description
      t.string :address1
      t.string :address2
      t.string :city
      t.string :state
      t.integer :zip
      t.belongs_to :user, null: false, foreign_key: true
      t.uuid :user_id

      t.timestamps
    end
  end
end
