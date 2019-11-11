require 'rest-client'
headers = {Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjZhNWE3NWFkNmFlZmQ2MjliNGMxYTIxMjRkY2NlYjMyNTZjOGQxOWQwMThjM2QwMzlhMGY0OTI4YjBmZDM4MzNmYTM4YjU5NDNmNmNlNTkxIn0.eyJhdWQiOiJSclg4UXhmVndyQzFWVDdocXJyU1dtNWhQUGM4eFJxaEJHUVNKdVo1R0x4VFl5S0RYMiIsImp0aSI6IjZhNWE3NWFkNmFlZmQ2MjliNGMxYTIxMjRkY2NlYjMyNTZjOGQxOWQwMThjM2QwMzlhMGY0OTI4YjBmZDM4MzNmYTM4YjU5NDNmNmNlNTkxIiwiaWF0IjoxNTczNDkzMDEwLCJuYmYiOjE1NzM0OTMwMTAsImV4cCI6MTU3MzQ5NjYxMCwic3ViIjoiIiwic2NvcGVzIjpbXX0.ay0qApEvN0DYYkibj4SaP6Q8E1MJInpWM8iqza7OCvUA8fvSQCPUXqTbL7MgWv27xUExXU0kVgPlNaLhXYMSRzoBrxx9YPhRtWWDX3qL6JZcTIZn0Osz_E80v5kAyTNbKbNXYVhUlsSzXkxS3bLXt_KiXcxg3nzLPuqpwApy0PqLOB8tVyt5xZ_hSHw3Eb4oq0hmsiE9j4TEExHFh1WciM8eXopQMJf_U9m3C-EytLYfjIldtPV3K90ILz5iVrEIF7BqS3UjfuQtKASj3Rgh4W7Di8IPOpEjxRrbX0AOghtou_lDgncCBqqT1zsRwL4qoyrGITX-yH3_n3uf_gf62w'}
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
        phone_number: Faker::PhoneNumber.phone_number
        
    )
end

