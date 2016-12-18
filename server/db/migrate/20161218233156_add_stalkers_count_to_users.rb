class AddStalkersCountToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :stalkers_count, :integer, index: true, default: 0
  end
end
