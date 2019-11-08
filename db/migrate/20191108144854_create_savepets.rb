class CreateSavepets < ActiveRecord::Migration[6.0]
  def change
    create_table :savepets do |t|
      t.references :user, null: false, foreign_key: true
      t.references :pet, null: false, foreign_key: true

      t.timestamps
    end
  end
end
