class CreatePets < ActiveRecord::Migration[6.0]
  def change
    create_table :pets do |t|
      t.string :name
      t.string :species
      t.string :breed
      t.string :gender
      t.string :age
      t.string :size
      t.string :description
      t.string :contact
      t.string :photo
      t.string :attributes

      t.timestamps
    end
  end
end
