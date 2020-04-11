class RemoveDropZipFromBusinessProfiles < ActiveRecord::Migration[6.0]
  def up
    remove_column :business_profiles, :zip
  end
end
