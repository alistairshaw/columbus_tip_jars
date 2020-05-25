class AddCategoryFieldToUserProfiles < ActiveRecord::Migration[6.0]
  def change
    add_column :user_profiles, :category, :string
  end
end
