class CreatePets < ActiveRecord::Migration[6.0]
  def change
    create_table :pets do |t|

      t.string :name
      t.string :species
      t.json :breed
      t.string :age
      t.string :gender
      t.string :size
      t.string :description
      t.json :contact
      t.json :photo
      t.json :details

      t.timestamps
    end
  end
end
