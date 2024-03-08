class CreateSsnovels < ActiveRecord::Migration[7.1]
  def change
    create_table :ssnovels do |t|
      t.string :title, null: false

      t.timestamps
    end
    add_index :ssnovels, :title, unique: true
  end
end
