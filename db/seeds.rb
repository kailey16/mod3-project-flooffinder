require 'rest-client'

headers = {Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjA1MjQ3Yjk5NDFiMGU0MjIzNWYyNDg1MTM5ZTg5ZWY2NTE0OGM5N2ExODEzYWRkZTIyOWYwY2I2YjY3OGY0ZGMyZTQ3M2E4MmE0ZDM3MzZjIn0.eyJhdWQiOiI4UlJqbE1kZzBLU2EzNTdwZUMyNHVBREhTUjI5bHlOeERVSHRiWUx0YjlHM1IxSVNQQSIsImp0aSI6IjA1MjQ3Yjk5NDFiMGU0MjIzNWYyNDg1MTM5ZTg5ZWY2NTE0OGM5N2ExODEzYWRkZTIyOWYwY2I2YjY3OGY0ZGMyZTQ3M2E4MmE0ZDM3MzZjIiwiaWF0IjoxNTczNTAwMzQ1LCJuYmYiOjE1NzM1MDAzNDUsImV4cCI6MTU3MzUwMzk0NSwic3ViIjoiIiwic2NvcGVzIjpbXX0.FNC6Kl7JOi0A5R7r8t6kxvJ7Jxg7j6Ko7AC_GD5dj8f8b5ureNN3XnP5iZf9SndHoGGUUd93hVzy9wA7ak9Iy3D-XwOHKVreQLDF8usd9c0ozJGz1b3mgBL_XVsReCfwmw6naLn6YsN1KjjKF5ZVr935nI2T2bTKY9E09T-zgbQ5U54r0nj8qtws6DnC5TLr7LeJJQE0pD4WrKu7-pPGbtwnRp5P60J3MCMytNF_AHvKPTarb68ZEvBvFt2XAEQ6DRoRt4bwJ40ZD-SAresWY-eTab9mML9g74FNSyH0ObdR_f0lFOvfK8agXMEOGFUYPJlqE5UBp32tOoqGnMLGCg"}
response = RestClient.get('https://api.petfinder.com/v2/animals?page=5', headers)
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

