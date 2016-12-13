Fabricator(:user) do
  email           { Faker::Internet.email }
  password_digest "password"
  city            { Faker::Address.city }
  state           { Faker::Address.state_abbr }
  profession      { Faker::Company.profession }
  company         { Faker::Company.name }
end

Fabricator(:new_user, from: :user) do
  email           { Faker::Internet.email }
  password              "password"
  password_confirmation "password"
  city            { Faker::Address.city }
  state           { Faker::Address.state_abbr }
  profession      { Faker::Company.profession }
  company         { Faker::Company.name }
end

Fabricator(:user_with_token, from: :user) do
  api_tokens { [ Fabricate(:api_token) ] }
end
