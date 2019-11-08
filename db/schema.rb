# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_11_08_144854) do

  create_table "pets", force: :cascade do |t|
    t.string "name"
    t.string "species"
    t.string "breed"
    t.string "gender"
    t.string "age"
    t.string "size"
    t.string "description"
    t.string "contact"
    t.string "photo"
    t.string "attributes"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "savepets", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "pet_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["pet_id"], name: "index_savepets_on_pet_id"
    t.index ["user_id"], name: "index_savepets_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "gender"
    t.integer "age"
    t.boolean "current_pet"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "savepets", "pets"
  add_foreign_key "savepets", "users"
end
