// document.addEventListener("DONContentLoaded", ()=>{})


////////// WELCOME BANNER


(function welcomeBanner() {
  function consoleText(words, id, colors) {
    if (colors === undefined) colors = ['#fff'];
    var visible = true;
    var con = document.getElementById('console');
    var letterCount = 1;
    var x = 1;
    var waiting = false;
    var target = document.getElementById(id)
    target.setAttribute('style', 'color:' + colors[0])
    window.setInterval(function() {

      if (letterCount === 0 && waiting === false) {
        waiting = true;
        target.innerHTML = words[0].substring(0, letterCount)
        window.setTimeout(function() {
          var usedColor = colors.shift();
          colors.push(usedColor);
          var usedWord = words.shift();
          words.push(usedWord);
          x = 1;
          target.setAttribute('style', 'color:' + colors[0])
          letterCount += x;
          waiting = false;
        }, 1000)
      } else if (letterCount === words[0].length + 1 && waiting === false) {
        waiting = true;
        window.setTimeout(function() {
          x = -1;
          letterCount += x;
          waiting = false;
        }, 1000)
      } else if (waiting === false) {
        target.innerHTML = words[0].substring(0, letterCount)
        letterCount += x;
      }
    }, 120)
    window.setInterval(function() {
      if (visible === true) {
        con.className = 'console-underscore hidden'
        visible = false;

      } else {
        con.className = 'console-underscore'

        visible = true;
      }
    }, 400)
  }
  consoleText(['Welcome to the Floof Finder!', 'These cute faces need your love!!!'], 'text',['#cd3b36','#cd3b36']);
})()



////////// PANEL CONTAINER DOG RENDERING
// fuction renderDogCard
let totalDogNum;
let currentDogId = 1;

function renderDogCard() {

  fetch("http://localhost:3000/pets")
    .then(res => res.json())
    .then(petsArray => {
      renderDog(petsArray[0]);
      totalDogNum = petsArray.length;
      document.querySelector("#agency").addEventListener("click", agencytapClicked);
      document.querySelector("#floof-tap").addEventListener("click", flooftapClicked);
    })
}

function renderDog(dog) {
  const panel = document.getElementById("panel-container")
  panel.innerHTML = ""
  const dogDiv = document.createElement("div")
  dogDiv.id = "dog-div"
  dogDiv.classList.add("card")

  /// left right arrows
  const leftArrow = document.createElement("div")
  leftArrow.id = "left-arrow"
  leftArrow.innerHTML = `<i class="fas fa-chevron-left fa-5x"></i>`
  leftArrow.addEventListener("click", leftArrowClicked)
  const rightArrow = document.createElement("div")
  rightArrow.id = "right-arrow"
  rightArrow.innerHTML = `<i class="fas fa-chevron-right fa-5x"></i>`
  rightArrow.addEventListener("click", rightArrowClicked)
  panel.append(leftArrow, rightArrow)

  /// card elements
  const toptaps = document.createElement("div")
  toptaps.classList.add("card-header")
  toptaps.innerHTML = `
    <ul class="nav nav-tabs card-header-tabs">
      <li class="nav-item">
        <a class="nav-link active" id="floof-tap">Floof</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="agency">Agency</a>
      </li>
    </ul>`
  dogDiv.append(toptaps)

  const photoandbioDiv = document.createElement("div")
  photoandbioDiv.id = "photoandbio"
  photoandbioDiv.classList.add("card-body")

  const image = document.createElement("img")
  image.src = dog.photo[0]["medium"]
  // image.src = "https://image.cnbcfm.com/api/v1/image/105992231-1561667465295gettyimages-521697453.jpeg?v=1561667497&w=740&h=416"
  image.id = "dog-image"
  image.addEventListener("click", savepetHandler)

  const bioDiv = document.createElement("div")
  bioDiv.id = "dog-bio"

  const nameTag = document.createElement("h2")
  nameTag.classList.add("card-title", "dog-name")
  nameTag.innerText = dog.name
  
  const bioLeftDiv = document.createElement("div")
  bioLeftDiv.classList.add("bio-left", "card-text")
  const ageTag = document.createElement("h5")
  ageTag.innerText = `Age: ${dog.age}`

  const breedTag = document.createElement("h5")
  if (dog.breed != null) {
    breedTag.innerText = `Breed: ${dog.breed}`}
  else {
    breedTag.innerText = `Breed: unknown`}

  const descriptionTag = document.createElement("h5")
  if (dog.description != null) {
    descriptionTag.innerText = `Description: ${dog.description}`}
  else {
    descriptionTag.innerText = `Description: I need a loving parent!`
  }
  bioLeftDiv.append(ageTag, breedTag, descriptionTag)

  const detailsDiv = document.createElement("div")
  detailsDiv.classList.add("bio-right", "card-text")
  detailsDiv.innerHTML = 
  `<p>Spayed? ${dog.details["spayed_neutered"]}</p>
  <p>House trained? ${dog.details["house_trained"]}</p>
  <p>Special needs? ${dog.details["special_needs"]}</p>
  <p>Shots current? ${dog.details["shots_current"]}</p>`

  bioDiv.append(nameTag, bioLeftDiv, detailsDiv)
  photoandbioDiv.append(image, bioDiv)
  dogDiv.append(photoandbioDiv)
  panel.append(dogDiv)
}




///// Event Listener call back functions

function leftArrowClicked(event) {
  currentDogId--
  if (currentDogId === 0) {
    alert("You are looking at the first fluff!")
  } else {
  fetch(`http://localhost:3000/pets/${currentDogId}`)
  .then(res => res.json())
  .then(petObj => {
    renderDog(petObj);
    document.querySelector("#agency").addEventListener("click", agencytapClicked);
    document.querySelector("#floof-tap").addEventListener("click", flooftapClicked);
  })
  }
}

function rightArrowClicked(event) {
  currentDogId++
  if (currentDogId === totalDogNum + 1) {
    alert("You are looking at the last fluff!")
  } else {
  fetch(`http://localhost:3000/pets/${currentDogId}`)
  .then(res => res.json())
  .then(petObj => {
    renderDog(petObj);
    document.querySelector("#agency").addEventListener("click", agencytapClicked);
    document.querySelector("#floof-tap").addEventListener("click", flooftapClicked);
  })  
  }
}

function agencytapClicked(event) {
  event.preventDefault()
  console.log("Agency clicked")
  const dogBioDiv = document.getElementById("dog-bio")

  fetch(`http://localhost:3000/pets/${currentDogId}`)
  .then(res => res.json())
  .then(dog => {
    dogBioDiv.innerHTML = `
    <div><h5 class="agency-info-title">Email</h5><p class="agency-info">${dog["contact"]["email"]}</p></div>
    <div><h5 class="agency-info-title">Phone number</h5><p class="agency-info">${dog["contact"]["phone"]}</p></div>
    <div><h5 class="agency-info-title">Address</h5><p class="agency-info">${dog["contact"]["address"]["address1"]}, ${dog["contact"]["address"]["city"]}, ${dog["contact"]["address"]["state"]} ${dog["contact"]["address"]["postcode"]}</p></div>
    `;
    document.querySelector("#agency").addEventListener("click", agencytapClicked);
    document.querySelector("#floof-tap").addEventListener("click", flooftapClicked);
  })
}


function flooftapClicked(event) {
  fetch(`http://localhost:3000/pets/${currentDogId}`)
  .then(res => res.json())
  .then(petObj => {
    renderDog(petObj);
    document.querySelector("#agency").addEventListener("click", agencytapClicked);
    document.querySelector("#floof-tap").addEventListener("click", flooftapClicked);
  })
}
