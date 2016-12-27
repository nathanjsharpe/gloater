NUM_USERS=100
NUM_GLOATS=2000

puts "Clearing old data"
Gloat.destroy_all
User.destroy_all

puts "Creating #{NUM_USERS} users..."
randomUserUri = URI("https://randomuser.me/api/?results=#{NUM_USERS}")

response = Net::HTTP.get(randomUserUri)
user_data = JSON.parse(response, symbolize_names: true)[:results]
users = User.create(user_data.map{|user| {
  email: user[:email],
  password: 'password',
  password_confirmation: 'password',
  city: user[:location][:city],
  state: user[:location][:state],
  profession: Faker::Company.profession,
  company: Faker::Company.name,
  name: [user[:name][:first], user[:name][:last]].join(' ').titleize,
  username: user[:login][:username],
  image: user[:picture][:medium]
}})

puts "Creating #{NUM_GLOATS} gloats..."
Fabricate.times(NUM_GLOATS, :gloat) do
  created_at { Time.now - rand(1..43200).minutes }
  user { users.sample }
end

puts "Users are stalking each other..."
users.each do |u|
  u.stalked_users = User.where.not(id: u.id).shuffle[0..2]
  u.save
end

puts "Users are admiring each other's gloats..."
users.each do |u|
  u.admired_gloats = Gloat.where.not(user_id: u.id).shuffle[0..30]
  u.save
end
