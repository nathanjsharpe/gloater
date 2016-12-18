class AddAdmirersCountToGloats < ActiveRecord::Migration[5.0]
  def change
    add_column :gloats, :admirers_count, :integer, index: true, default: 0
  end
end
