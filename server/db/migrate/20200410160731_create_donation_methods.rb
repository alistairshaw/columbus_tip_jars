class CreateDonationMethods < ActiveRecord::Migration[6.0]
  def change
    create_table :donation_methods do |t|
      t.references :profile, null: false, polymorphic: true
      t.string :vendor_name
      t.string :vendor_id

      t.timestamps
    end
  end
end
