Fabricator(:gloat) do
  content { Faker::StarWars.quote.truncate(140) }
end
