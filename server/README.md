# Use it

## Run it

1. Install: `bundle install`
2. Set up database: `bin/rails db:setup`
3. Run server: `bin/rails s`
4. Use it at `localhost:3000`

You may want to start the web app in the `client` directory alongside this `server` directory to use it. Or, you know, `curl` away (or postman or whatever suits your fancy).

## Test it

1. Install: `bundle install`
2. Set up database: `bin/rails db:migrate RAILS_ENV=test`
3. Run tests: `bin/rspec`

# Set up notes

The database seeds use the `randomuser.me` api to create users. You get images that way, which makes things less boring.

# Gems

There are a few comments in the `Gemfile`, but I don't think I used anything too out of the ordinary.

# TODO

pagination - headers
docker
