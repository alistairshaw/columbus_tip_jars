class AddStringZipToBusinessProfiles < ActiveRecord::Migration[6.0]
  def change
    add_column :business_profiles, :zip, :string
  end
end
