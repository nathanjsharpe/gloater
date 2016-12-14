# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Gloat.destroy_all
User.destroy_all

randomUserUri = URI('https://randomuser.me/api/')

10.times do |i|
  response = Net::HTTP.get(randomUserUri)
  user = JSON.parse(response, symbolize_names: true)[:results].first
  User.create({
    email: user[:email],
    password: 'password',
    password_confirmation: 'password',
    city: user[:location][:city],
    state: user[:location][:state],
    profession: Faker::Company.profession,
    company: Faker::Company.name,
    name: [user[:name][:first], user[:name][:last]].join(' ').titleize,
    username: user[:login][:username]
  })
end

users = User.all

Fabricate.times(50, :gloat) do
  user users.sample
end
