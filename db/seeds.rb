require 'rest-client'
headers = {Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijc2MmQyMjcwNmY1Yjk2Y2FmY2JlOGE0M2JkMjM3Zjg4Njc3NjczYWZkMDU3ODRlOTZkMDQ0NGE0ZmQwMmU5MDI5NjQzNDBiYmFjZTNkNWFhIn0.eyJhdWQiOiI4UlJqbE1kZzBLU2EzNTdwZUMyNHVBREhTUjI5bHlOeERVSHRiWUx0YjlHM1IxSVNQQSIsImp0aSI6Ijc2MmQyMjcwNmY1Yjk2Y2FmY2JlOGE0M2JkMjM3Zjg4Njc3NjczYWZkMDU3ODRlOTZkMDQ0NGE0ZmQwMmU5MDI5NjQzNDBiYmFjZTNkNWFhIiwiaWF0IjoxNTczMjQ2MTMyLCJuYmYiOjE1NzMyNDYxMzIsImV4cCI6MTU3MzI0OTczMiwic3ViIjoiIiwic2NvcGVzIjpbXX0.oatnmgua31m750knkpcdQtLMGywFYDlBSbUoWtViEKggSlFL3if-7Ta1cNyzJj74j7SCTx6UJwANcI3aidjuMG2bPPFTZrGZELnzGohkNOPl7TyNtRRRAZ8E4_hZYkri3f11XcKyZvnxAq2CGJQvdNcIRfEpaIpQonwdV6IaqEMOn1AV0UN0EW33OjePAJS_e0TpATT-IHbVJmHE4X-Otf0leD_-qQkKRV7VL8fBbrKZBMu4A0db9n1tNoHmwO-QauzwtPxdqZ0tb71LZVioLN-V_mJlKciVLHt19ydNTjVLBZ32Y6Jtf0cC7uqLVMveAyw2IRCG5nDqVb_VDzwGAg"}
response = RestClient.get('https://api.petfinder.com/v2/animals?page=5', headers)
petsArray = JSON.parse(response.body)

petsArray["animals"].each do |pet|

    Pet.create(
        species: pet["species"],
        breed: pet["breed"],
        age: pet["age"],
        gender: pet["gender"],
        size: pet["size"],
        description: pet["description"],
        contact: pet["contact"],
        photo: pet["photos"],
        name: pet["name"],
        details: pet["attributes"]
    )
end



# create 100 users of the website
100.times do
    User.find_or_create_by(
        name: Faker::Name.first_name,
        email: Faker::Internet.email,
        gender: Faker::Gender.binary_type,
        age: rand(20..60)
    )
end

