class DeviseCreateUsers < ActiveRecord::Migration[7.1]
  def change
    remove_column :users, :password_digest, :string
    add_column :users, :encrypted_password, :string, null: false, default: ""
    add_column :users, :reset_password_token, :string
    add_index :users, :reset_password_token, unique: true
    add_column :users, :reset_password_sent_at, :datetime
    add_column :users, :remember_created_at, :datetime
  end
end
