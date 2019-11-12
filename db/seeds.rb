require 'rest-client'

headers = {Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQ4OGZjNjI3NTM0MjFlMjM4ZDMzN2EwYWMzYzQ4ZTcxMDg5MzFmN2RiOTVjZjg5ZjQ1NzgyMGI1NjAwYWI3OTUyNTUxNmYyODVjNDcyOTNjIn0.eyJhdWQiOiI4UlJqbE1kZzBLU2EzNTdwZUMyNHVBREhTUjI5bHlOeERVSHRiWUx0YjlHM1IxSVNQQSIsImp0aSI6ImQ4OGZjNjI3NTM0MjFlMjM4ZDMzN2EwYWMzYzQ4ZTcxMDg5MzFmN2RiOTVjZjg5ZjQ1NzgyMGI1NjAwYWI3OTUyNTUxNmYyODVjNDcyOTNjIiwiaWF0IjoxNTczNTcwMzYyLCJuYmYiOjE1NzM1NzAzNjIsImV4cCI6MTU3MzU3Mzk2Miwic3ViIjoiIiwic2NvcGVzIjpbXX0.Hei_pITwft9xoPeEn3LslHzjm3FzfHnjFc4cy1XrV10XgQ95IRi49LDV21wROxSspUUifHZO3Y8slbDADk7a8_0KNsCK5PtFAH0XWr7HXj7DbD6fSpvC_Lh5yLwMxe7pwCxH43ef4RjvRCLjllCvo8fS7NCXSclCdQ8FvNr5YDcr-q5JYqrXLS53pY8jreva8-JPgN-Q0ifRVqijwhIa7eIpRUKMOvFiKD-S_7_jGHBH_0hzmpfmsk8XA1O5VROobwFZP3WmhPI05WNc9Iftij5tUOczUlqYDYpnbsLLaKxX5dLnj34qTcNJ3nHCF24l076aIbVT7xYblY4B8CzmfQ"}
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

