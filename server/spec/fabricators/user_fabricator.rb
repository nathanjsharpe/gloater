Fabricator(:user) do
  email           { Faker::Internet.email }
  password_digest "password"
  city            { Faker::Address.city }
  state           { Faker::Address.state_abbr }
  profession      { Faker::Company.profession }
  company         { Faker::Company.name }
  name            { Faker::StarWars.character }
  username        { Faker::Internet.user_name * 2 }
  image           { 'http://placehold.it/150x150'}
end

Fabricator(:new_user, from: :user) do
  email           { Faker::Internet.email }
  password              "password"
  password_confirmation "password"
  city            { Faker::Address.city }
  state           { Faker::Address.state_abbr }
  profession      { Faker::Company.profession }
  company         { Faker::Company.name }
  name            { Faker::StarWars.character }
  username        { Faker::Internet.user_name * 2 }
  image           { 'http://placehold.it/150x150'}
end

Fabricator(:user_with_token, from: :user) do
  api_tokens { [ Fabricate(:api_token) ] }
end
