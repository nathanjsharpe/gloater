# README

Setup databse `bin/rails db:setup`
Run server: `bin/rails s`
Run tests: `bin/rails rspec`

project created with rails new --api, skipping most things
rspec, fabricator, database_cleaner for testing

# Features

## Authorization

add pundit
only signed in users can create gloats
  post to gloats saves gloat with current user id
users can only update their own gloats
users can only destroy their own gloats

pagination
