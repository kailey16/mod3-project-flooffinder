require 'rest-client'

headers = {Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjlhZjZhYjZiODc0ODMwMzc4MDcxMjQ0MDgyODExMjliYTY4OTYxZmIwMmI5OTNmM2M4ZTNkNzYwODc5MDZlZmQ5OTdmMDRmZjE3MDY0MTk2In0.eyJhdWQiOiJSclg4UXhmVndyQzFWVDdocXJyU1dtNWhQUGM4eFJxaEJHUVNKdVo1R0x4VFl5S0RYMiIsImp0aSI6IjlhZjZhYjZiODc0ODMwMzc4MDcxMjQ0MDgyODExMjliYTY4OTYxZmIwMmI5OTNmM2M4ZTNkNzYwODc5MDZlZmQ5OTdmMDRmZjE3MDY0MTk2IiwiaWF0IjoxNTczNTkyNDA3LCJuYmYiOjE1NzM1OTI0MDcsImV4cCI6MTU3MzU5NjAwNiwic3ViIjoiIiwic2NvcGVzIjpbXX0.rOzeaEzLhW7c1zeqy6aurBDYRDv40Mv52PZeDv378X_L3dn_htbBPA5swlaLfYDNsU1YpOA2wIlO0NrzAGCYuHMX-V0rgQe2vak4IhtEX-HHRhYGAWlK2log3A6LY0BYjLWcQzeI9yklDavTs2AWrIxSDmmWew_YR7nqtmLUAizrelpbZCLJk3KjYv3qyVlygQt2M5eJjJS9B3LjlKjXjs6aZKDG44JoJlxvvDnfoJgySBMD7Yqu2txl_6pMQkO-xmpHvtbwONfNkq1Hv2M9L-TgFw8XDJQcu2-JiYUSs78WQQHRjunbz7EIV-I28x0XO4FEB-IEhlEAz9ukHO9Uqw"}
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

