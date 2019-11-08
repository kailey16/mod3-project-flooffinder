require 'rest-client'
headers = {Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU2ZjI2MDU4YTVmZWU4ZWZhYWRlY2I4NTM1MzI0MWViMDU5MWVhZTkxNTUxNzZhZGJlZWI1YWQwNTgzYWRiYjZiMmQwODhiZTM0YjJjODc2In0.eyJhdWQiOiJSclg4UXhmVndyQzFWVDdocXJyU1dtNWhQUGM4eFJxaEJHUVNKdVo1R0x4VFl5S0RYMiIsImp0aSI6ImU2ZjI2MDU4YTVmZWU4ZWZhYWRlY2I4NTM1MzI0MWViMDU5MWVhZTkxNTUxNzZhZGJlZWI1YWQwNTgzYWRiYjZiMmQwODhiZTM0YjJjODc2IiwiaWF0IjoxNTczMjI2ODg3LCJuYmYiOjE1NzMyMjY4ODcsImV4cCI6MTU3MzIzMDQ4Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.SdToNYajBQwwjmZubOGxvjcXci70QPnO5eML-npNrM-CS7kvSx-nNnyKVYaZZtiMsWSRR1vDAHyJ7Hl1jrRF-0WY_xEpSq078sNXijiXMd75_4hPPrsuoNnNPBz-4-uHtN8uYt5RhSRtEj5HuZV0BzKKGr9xTPV_f1pHIjTn8uCv3w-9clgiFOo4kAnC6ZyriF7nF6YQTcWeMSC8F973YcvIYiLopA39iVaR5i5ALlXRfF3IgHSxtBea09NtqphyI-nyKug1oaFvqJ3jeryPWcJ3HrNLzWPdnBEPYnanKo1qjUwga_mTSVz0f4WSKuOtUYGt9CHwBKTL8E0uY_t97A'}
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
