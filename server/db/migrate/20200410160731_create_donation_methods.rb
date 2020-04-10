class CreateDonationMethods < ActiveRecord::Migration[6.0]
  def change
    create_table :donation_methods do |t|
      t.references :user_profile, polymorphic: true, null: false
      t.references :business_profile, polymorphic: true, null: false
      t.string :vendor_name
      t.string :vendor_id

      t.timestamps
    end
  end
end
