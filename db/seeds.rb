require 'rest-client'

headers = {Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImEzZTU4ZDUxOThlY2VlZDdlY2FjNGYzZTY0ZmNlMDhjNmVkZjM0N2EyMzRiNDdjODc1YjBmYTVmYTUzNzc4N2Y3NWU2Njk0NTMwNzhlNzM4In0.eyJhdWQiOiI4UlJqbE1kZzBLU2EzNTdwZUMyNHVBREhTUjI5bHlOeERVSHRiWUx0YjlHM1IxSVNQQSIsImp0aSI6ImEzZTU4ZDUxOThlY2VlZDdlY2FjNGYzZTY0ZmNlMDhjNmVkZjM0N2EyMzRiNDdjODc1YjBmYTVmYTUzNzc4N2Y3NWU2Njk0NTMwNzhlNzM4IiwiaWF0IjoxNTczNDkyNzk5LCJuYmYiOjE1NzM0OTI3OTksImV4cCI6MTU3MzQ5NjM5OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.rGo2dl8uCzeDDlqW7JiJxU3WJ62PRDrZtAG5p6tKCZpvBpXOiNtpn3njHlESxZ4IuN5NS7aBVWbg2DSeEtgHlXPa1fKL7-2H_uTOVMYoGkFVMDtdR1GaMEQx44S0sIjoH5mqqdxln0n3yI75f7wvVCPW3SyUFYDc99XfejvW1-hFurBO_RbQ2IG2addtPMYpdulLYBFF0rdJ2jq1BoXmvWhIjiRwEZQkuvuDgNuCyW2nuEoCQsqtGM4hKVWVKXGQWN43D1XNWXkB64xfQOrLH2tTA-iLzEgjDCKXwxFHX2lcauiU3iiFSf4V5hYaQY-JRhc0NLtShlbT2qAbaMWqEw"}
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



# create 100 users of the website
100.times do
    User.find_or_create_by(
        name: Faker::Name.first_name,
        email: Faker::Internet.email,
        phone_number: Faker::PhoneNumber.phone_number
        
    )
end

