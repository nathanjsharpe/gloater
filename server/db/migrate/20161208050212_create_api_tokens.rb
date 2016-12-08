class CreateApiTokens < ActiveRecord::Migration[5.0]
  def change
    create_table :api_tokens do |t|
      t.references :user, foreign_key: true
      t.string :token, index: true
      t.datetime :expires_at

      t.timestamps
    end
  end
end
