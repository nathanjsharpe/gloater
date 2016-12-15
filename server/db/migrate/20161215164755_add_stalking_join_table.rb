class AddStalkingJoinTable < ActiveRecord::Migration[5.0]
  def change
    create_table :stalks, id: false do |t|
      t.integer :stalked_id, index: true, null: false
      t.integer :stalker_id, index: true, null: false
    end
  end
end
