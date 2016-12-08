class CreateGloats < ActiveRecord::Migration[5.0]
  def change
    create_table :gloats do |t|
      t.string :content

      t.timestamps
    end
  end
end
