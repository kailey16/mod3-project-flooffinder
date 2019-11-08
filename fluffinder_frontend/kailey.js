{/* <div id="dog-div">
    <div id="photoandbio">
          <div id="dog-photo">
              <img>
          </div>
          <div id="dog-bio">
          </div>
    </div>
</div> */}

function renderDog(dog) {
  const panel = document.getElementById("panel-container")
  panel.innerHTML = ""
  const dogDiv = document.createElement("div")
  dogDiv.id = "dog-div"
  panel.append(dogDiv)

  const photoandbioDiv = document.createElement("div")
  photoandbioDiv.id = "photoandbio"
  dogDiv.append(photoandbioDiv)

  const photoDiv = document.createElement("div")
  photoDiv.id = "dog-photo"
  const image = document.createElement("img")
  image.src = dog.photo
  image.id = "dog-image"
  photoDiv.append(image)

  const bioDiv = document.createElement("div")
  bioDiv.id = "dog-bio"
  const nameH2 = document.createElement("h2")
  nameH2.innerText = `Name: ${dog.name}`
  const ageH3 = document.createElement("h3")
  ageH3.innerText = `Age: ${dog.age}`
  const breedH3 = document.createElement("h3")
  breedH3.innerText = `Breed: ${dog.breed}`
  const contactH4 = document.createElement("h4")
  contactH4.innerText = `Contact: ${dog.contact}`
  const detailsDiv = document.createElement("div")
  bioDiv.append(nameH2, ageH3, breedH3, contactH4, detailsDiv)

  const 

  photoandbioDiv.append(photoDiv, bioDiv)
}