Fabricator(:user) do
  email           { Faker::Internet.email }
  password_digest "asdf"
  city            { Faker::Address.city }
  state           { Faker::Address.state_abbr }
  profession      { Faker::Company.profession }
  company         { Faker::Company.name }
end
