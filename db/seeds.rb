require 'rest-client'

headers = {Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjZiMzNkNDY0MDUxZDA0ZGMxMmQ4OThkY2VjMTUzZWE3OTk2MjQwYjgwMjdmNzEwMzQ3NzQyN2UxMDUxNGNkZGYwYzQ2M2QwNmVmMmUwZmM3In0.eyJhdWQiOiI4UlJqbE1kZzBLU2EzNTdwZUMyNHVBREhTUjI5bHlOeERVSHRiWUx0YjlHM1IxSVNQQSIsImp0aSI6IjZiMzNkNDY0MDUxZDA0ZGMxMmQ4OThkY2VjMTUzZWE3OTk2MjQwYjgwMjdmNzEwMzQ3NzQyN2UxMDUxNGNkZGYwYzQ2M2QwNmVmMmUwZmM3IiwiaWF0IjoxNTczNzQ0MDk5LCJuYmYiOjE1NzM3NDQwOTksImV4cCI6MTU3Mzc0NzY5OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.p29p4RfACHSzVlqcreSbyO4NFk1TR6QnfUq1kN8YdNNxZj6HkUDVXIoSfVKzthEmwdJ-KF_oIFzP3Ei_yP1YjCtsHHb0f_N1ltGrFQIaTkHaiWKtVP5hszYcXucWShRSrDYedXW9P0cprVn-mGsvKq3J7JoyFXwWd0_nctLhxfnd1QgfNQ6IhPO9RdQDoZtn_3RrwUdiwYD93YiovdQMKVVM2Da9OimA1wxYPb8yLorWgVU5cKRNHHvkKk8jRZ2FGw5QmhixfGNaC2BTafwgm4ZNCQiuLzUwej3edUA-zSn0BZbCnx7PKt2f0_S75nFpu0F9Py3F04q91nADcz3ePw"}
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

