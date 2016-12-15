# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161215164755) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admires", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "gloat_id"
    t.index ["gloat_id"], name: "index_admires_on_gloat_id", using: :btree
    t.index ["user_id"], name: "index_admires_on_user_id", using: :btree
  end

  create_table "api_tokens", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "token"
    t.datetime "expires_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["token"], name: "index_api_tokens_on_token", using: :btree
    t.index ["user_id"], name: "index_api_tokens_on_user_id", using: :btree
  end

  create_table "gloats", force: :cascade do |t|
    t.string   "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "user_id"
    t.index ["user_id"], name: "index_gloats_on_user_id", using: :btree
  end

  create_table "stalks", id: false, force: :cascade do |t|
    t.integer "stalked_id", null: false
    t.integer "stalker_id", null: false
    t.index ["stalked_id"], name: "index_stalks_on_stalked_id", using: :btree
    t.index ["stalker_id"], name: "index_stalks_on_stalker_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email"
    t.string   "password_digest"
    t.string   "city"
    t.string   "state"
    t.string   "profession"
    t.string   "company"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "username",        null: false
    t.string   "name"
    t.string   "image"
    t.index ["email"], name: "index_users_on_email", using: :btree
  end

  add_foreign_key "admires", "gloats"
  add_foreign_key "admires", "users"
  add_foreign_key "api_tokens", "users"
end
