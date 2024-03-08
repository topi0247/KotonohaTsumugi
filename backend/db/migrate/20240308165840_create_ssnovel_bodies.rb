class CreateSsnovelBodies < ActiveRecord::Migration[7.1]
  def change
    create_table :ssnovel_bodies do |t|
      t.text :content, null: false
      t.integer :narrative_stage, null: false, default: 0
      t.references :ssnovel, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
