class CreatePets < ActiveRecord::Migration[6.0]
  def change
    create_table :pets do |t|

      t.string :species
      t.string :breed
      t.string :age
      t.string :gender
      t.string :size
      t.string :description
      t.string :contact
      t.string :photo
      t.string :name
      t.string :details

      t.timestamps
    end
  end
end
