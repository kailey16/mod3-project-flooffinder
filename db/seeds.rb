require 'rest-client'

headers = {Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjI2MmFmMGE3ZDU4ZWIyNzhkNGM3MWQ5ZWM4NTdkYWJhMzIzNDNjNDU5MDRmZDU0M2JkYmExODczZDg1ZTRlMGZkOWZjMDhiMTk2MTYyOThmIn0.eyJhdWQiOiI4UlJqbE1kZzBLU2EzNTdwZUMyNHVBREhTUjI5bHlOeERVSHRiWUx0YjlHM1IxSVNQQSIsImp0aSI6IjI2MmFmMGE3ZDU4ZWIyNzhkNGM3MWQ5ZWM4NTdkYWJhMzIzNDNjNDU5MDRmZDU0M2JkYmExODczZDg1ZTRlMGZkOWZjMDhiMTk2MTYyOThmIiwiaWF0IjoxNTczNjcxMzY5LCJuYmYiOjE1NzM2NzEzNjksImV4cCI6MTU3MzY3NDk2OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.kg8DDOZIwIBXm5RCaibO7UxK2abV-nAqTXz9FSosSwChqoBa8aHOAkP5Tp9hYLJ_UNWgU8oyKJ6VjcaVUjnKACTkLRizVKzLlKUTriutiPLyNqaBTNipga2c-a7g9-KseepDyUKrQ7x83ZulR5fQmRAtIyvEsEylBWYgYFOYTnzQIqTlyrNGp918Y5mc03gr5m-1zCn4HHzlXX8wrBGT06d2YUNmZXmSXz0dzDAq0KIOwDOteMRgVUb63mWS16lsE-h4EtVG9EKnUuN144-MMhz4urhQTV3yzomgzmgpJZxNYLf0hiGJY0BjzSv6DwkcuFU7CKjusrQdQG2y6kS_UA"}
response = RestClient.get('https://api.petfinder.com/v2/animals?limit=100', headers)
petsArray = JSON.parse(response.body)

petsArray["animals"].each do |pet|
    if pet["photos"].length != 0
        if pet["species"] == "Dog"
            Pet.find_or_create_by(
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
    end
end


User.destroy_all

# create 100 users of the website
100.times do
    User.find_or_create_by(
        name: Faker::Name.first_name,
        email: Faker::Internet.email,
        phone_number: Faker::PhoneNumber.phone_number
    )
end

