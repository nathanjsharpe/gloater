class CreateAdmires < ActiveRecord::Migration[5.0]
  def change
    create_table :admires, id: false do |t|
      t.references :user, foreign_key: true
      t.references :gloat, foreign_key: true
    end
  end
end
