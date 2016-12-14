class AddUsernameAndNameToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :username, :string, index: true, null: false, unique: true
    add_column :users, :name, :string
  end
end
