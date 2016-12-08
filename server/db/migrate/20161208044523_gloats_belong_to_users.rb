class GloatsBelongToUsers < ActiveRecord::Migration[5.0]
  def change
    change_table :gloats do |t|
      t.references :user
    end
  end
end
