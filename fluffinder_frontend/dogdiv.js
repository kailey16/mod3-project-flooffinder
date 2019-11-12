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
  leftArrow.innerHTML = `<i class="fas fa-chevron-left fa-4x"></i>`
  leftArrow.addEventListener("click", leftArrowClicked)
  const rightArrow = document.createElement("div")
  rightArrow.id = "right-arrow"
  rightArrow.innerHTML = `<i class="fas fa-chevron-right fa-4x"></i>`
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
  image.id = "dog-image"
  image.addEventListener("click", savepetHandler)

  const bioDiv = document.createElement("div")
  bioDiv.id = "dog-bio"

  const nameTag = document.createElement("h2")
  nameTag.classList.add("card-title", "dog-name")
  nameTag.innerText = dog.name
  
  const bioLeftDiv = document.createElement("div")
  bioLeftDiv.classList.add("bio-left", "list-group", "list-group-flush")
  const ageTag = document.createElement("div")
  ageTag.innerHTML = `<b>AGE</b> <i class="fas fa-paw"></i> ${dog.age}`
  ageTag.classList.add("list-group-item")

  const breedTag = document.createElement("div")
  if (dog.breed != null) {
    breedTag.innerHTML = `<b>BREED</b> <i class="fas fa-paw"></i> ${dog.breed}`
    breedTag.classList.add("list-group-item")
  }
  else {
    breedTag.innerHTML = `<b>BREED</b> <i class="fas fa-paw"></i> unknown`
    breedTag.classList.add("list-group-item")
  }

  const descriptionTag = document.createElement("div")
  if (dog.description != null) {
    descriptionTag.innerHTML = `<b>DESCRIPTION</b> <i class="fas fa-paw"></i><br> ${dog.description}`
    descriptionTag.classList.add("list-group-item")
  }
  else {
    descriptionTag.innerHTML = `<b>DESCRIPTION</b> <i class="fas fa-paw"></i><br> I need a loving parent!`
    descriptionTag.classList.add("list-group-item")
  }
  bioLeftDiv.append(ageTag, breedTag, descriptionTag)

  const detailsDiv = document.createElement("div")
  detailsDiv.classList.add("bio-right", "list-group", "list-group-flush")
  detailsDiv.innerHTML = 
  `<p class="list-group-item"><i class="fas fa-paw"></i> <b>Is ${dog.name}</b> <i class="fas fa-paw"></i></p>
  <p class="list-group-item-q"><b>Spayed?</b> ${dog.details["spayed_neutered"]}</p>
  <p class="list-group-item-q"><b>House trained?</b> ${dog.details["house_trained"]}</p>
  <p class="list-group-item-q"><b>Special needs?</b> ${dog.details["special_needs"]}</p>
  <p class="list-group-item-q"><b>Shots current?</b> ${dog.details["shots_current"]}</p>`

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
    dogBioDiv.classList.add("list-group", "list-group-flush")
    dogBioDiv.innerHTML = `
    <div class="list-group-item"><h5>Email</h5><p class="list-group-item-q">${dog["contact"]["email"]}</p></div>
    <div class="list-group-item"><h5>Phone number</h5><p class="list-group-item-q">${dog["contact"]["phone"]}</p></div>
    <div class="list-group-item"><h5>Address</h5><p class="list-group-item-q">${dog["contact"]["address"]["address1"]}, ${dog["contact"]["address"]["city"]}, ${dog["contact"]["address"]["state"]} ${dog["contact"]["address"]["postcode"]}</p></div>
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
