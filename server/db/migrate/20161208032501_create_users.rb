class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.string :city
      t.string :state
      t.string :profession
      t.string :company

      t.timestamps
    end
  end
end
