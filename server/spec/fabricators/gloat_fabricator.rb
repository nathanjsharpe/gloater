Fabricator(:gloat) do
  user
  content { Faker::StarWars.quote.truncate(140) }
end
