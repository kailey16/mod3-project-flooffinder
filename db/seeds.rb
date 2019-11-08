# require 'rest-client'
# headers = {Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU2ZjI2MDU4YTVmZWU4ZWZhYWRlY2I4NTM1MzI0MWViMDU5MWVhZTkxNTUxNzZhZGJlZWI1YWQwNTgzYWRiYjZiMmQwODhiZTM0YjJjODc2In0.eyJhdWQiOiJSclg4UXhmVndyQzFWVDdocXJyU1dtNWhQUGM4eFJxaEJHUVNKdVo1R0x4VFl5S0RYMiIsImp0aSI6ImU2ZjI2MDU4YTVmZWU4ZWZhYWRlY2I4NTM1MzI0MWViMDU5MWVhZTkxNTUxNzZhZGJlZWI1YWQwNTgzYWRiYjZiMmQwODhiZTM0YjJjODc2IiwiaWF0IjoxNTczMjI2ODg3LCJuYmYiOjE1NzMyMjY4ODcsImV4cCI6MTU3MzIzMDQ4Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.SdToNYajBQwwjmZubOGxvjcXci70QPnO5eML-npNrM-CS7kvSx-nNnyKVYaZZtiMsWSRR1vDAHyJ7Hl1jrRF-0WY_xEpSq078sNXijiXMd75_4hPPrsuoNnNPBz-4-uHtN8uYt5RhSRtEj5HuZV0BzKKGr9xTPV_f1pHIjTn8uCv3w-9clgiFOo4kAnC6ZyriF7nF6YQTcWeMSC8F973YcvIYiLopA39iVaR5i5ALlXRfF3IgHSxtBea09NtqphyI-nyKug1oaFvqJ3jeryPWcJ3HrNLzWPdnBEPYnanKo1qjUwga_mTSVz0f4WSKuOtUYGt9CHwBKTL8E0uY_t97A'}
# response = RestClient.get('https://api.petfinder.com/v2/animals?page=5', headers)
# petsArray = JSON.parse(response.body)
# petsArray["animals"].each do |pet|

#     Pet.create(
#         species: pet["species"],
#         breed: pet["breed"],
#         age: pet["age"],
#         gender: pet["gender"],
#         size: pet["size"],
#         description: pet["description"],
#         contact: pet["contact"],
#         photo: pet["photos"],
#         name: pet["name"],
#         details: pet["attributes"]
#     )
# end

Pet.create(
"species": "Dog",
"breed": nil,
"age": "Adult",
"gender": "Male",
"size": "Medium",
"description": nil,
"contact": "{\"email\"=>\"info@rescuevillage.org\", \"phone\"=>\"(440) 338-4819\", \"address\"=>{\"address1\"=>\"15463 Chillicothe Rd\", \"address2\"=>nil, \"city\"=>\"Novelty\", \"state\"=>\"OH\", \"postcode\"=>\"44072\", \"country\"=>\"US\"}}",
"photo": "[{\"small\"=>\"https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/46516287/1/?bust=1573229829&width=100\", \"medium\"=>\"https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/46516287/1/?bust=1573229829&width=300\", \"large\"=>\"https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/46516287/1/?bust=1573229829&width=600\", \"full\"=>\"https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/46516287/1/?bust=1573229829\"}]",
"name": "Zuma@PetSmart Aurora 12-3",
"details": "{\"spayed_neutered\"=>true, \"house_trained\"=>false, \"declawed\"=>nil, \"special_needs\"=>false, \"shots_current\"=>false}",
"created_at": "2019-11-08T16:19:34.766Z",
"updated_at": "2019-11-08T16:19:34.766Z"
)


# create 100 users of the website
100.times do
    User.find_or_create_by(
        name: Faker::Name.first_name,
        gender: Faker::Gender.binary_type,
        age: rand(20..60),
        current_pet: Faker::Boolean.boolean
    )
end