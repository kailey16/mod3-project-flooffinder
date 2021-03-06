////////// WELCOME BANNER
function welcomeBanner() {
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
}



////////// PANEL CONTAINER DOG RENDERING
let totalDogNum;
let currentDogId;
let currentDogName;

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
  currentDogId = dog.id;
  currentDogName = dog.name;

  const panel = document.getElementById("panel-container")
  panel.innerHTML = ""
  panel.classList.add("container")

  const rowDiv = document.createElement("div")
  rowDiv.classList.add("row")
  panel.append(rowDiv)

  const col1 = document.createElement("div")
  const col2 = document.createElement("div")
  const col3 = document.createElement("div")
  col1.classList.add("col")
  col2.classList.add("col")
  col3.classList.add("col")
  rowDiv.append(col1, col2, col3)

  const dogDiv = document.createElement("div")
  dogDiv.id = "dog-div"
  dogDiv.classList.add("card")
  col2.append(dogDiv)

  //// left right arrows
  const leftArrow = document.createElement("div")
  leftArrow.id = "left-arrow"
  leftArrow.classList.add('grow')
  leftArrow.innerHTML = `<i class="fas fa-chevron-left fa-4x"></i>`
  leftArrow.addEventListener("click", leftArrowClicked)
  col1.append(leftArrow)

  const rightArrow = document.createElement("div")
  rightArrow.id = "right-arrow"
  rightArrow.classList.add('grow')
  rightArrow.innerHTML = `<i class="fas fa-chevron-right fa-4x"></i>`
  rightArrow.addEventListener("click", rightArrowClicked)
  col3.append(rightArrow)  

  /// savepet icon
  const savepetIcon = document.createElement("div")
  savepetIcon.innerHTML = `<i class="fas fa-heart fa-2x"></i><i class="fas fa-dog fa-5x fa-flip-horizontal"></i>`
  savepetIcon.id = "save-pet-icon"
  savepetIcon.classList.add("grow")
  col3.append(savepetIcon)
  savepetIcon.addEventListener("dragover", draggedOver)

  /// card elements
  const toptaps = document.createElement("div")
  toptaps.classList.add("card-header")
  toptaps.innerHTML = `
    <ul class="nav nav-tabs card-header-tabs">
      <li class="nav-item floof-top-tap">
        <a class="nav-link active" id="floof-tap">Floof</a>
      </li>
      <li class="nav-item agency-top-tap">
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
  image.draggable = true
  image.addEventListener("dragend", dogsavedropped)

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

  const genderTag = document.createElement("div")
  genderTag.innerHTML = `<b>GENDER</b> <i class="fas fa-paw"></i> ${dog.gender}`
  genderTag.classList.add("list-group-item")
  

  const descriptionTag = document.createElement("div")
  if (dog.description != null) {
    descriptionTag.innerHTML = `<b>DESCRIPTION</b> <i class="fas fa-paw"></i><br> ${dog.description}`
    descriptionTag.classList.add("list-group-item")
  }
  else {
    descriptionTag.innerHTML = `<b>DESCRIPTION</b> <i class="fas fa-paw"></i><br> I need a loving parent!`
    descriptionTag.classList.add("list-group-item")
  }
  bioLeftDiv.append(ageTag, genderTag, descriptionTag)

  const detailsDiv = document.createElement("div")
  detailsDiv.classList.add("bio-right", "list-group", "list-group-flush")

  const amI = document.createElement("p")
  amI.classList.add("list-group-item")
  amI.innerHTML = `<i class="fas fa-paw"></i> <b>Am I</b> <i class="fas fa-paw"></i>`

  const spay = document.createElement("p")
  spay.classList.add("list-group-item-q")
  if (dog.details["spayed_neutered"]) {
    spay.innerHTML = `<b>Spayed?</b> <i class="fas fa-check"></i>`
  } else {spay.innerHTML = `<b>Spayed?</b> <i class="fas fa-times"></i>`}

  const houset = document.createElement("p")
  houset.classList.add("list-group-item-q")
  if (dog.details["house_trained"]) {
    houset.innerHTML = `<b>House trained?</b> <i class="fas fa-check"></i>`
  } else {houset.innerHTML = `<b>House trained?</b> <i class="fas fa-times"></i>`}

  const special = document.createElement("p")
  special.classList.add("list-group-item-q")
  if (dog.details["special_needs"]) {
    special.innerHTML = `<b>Special needs?</b> <i class="fas fa-check"></i>`
  } else {special.innerHTML = `<b>Special needs?</b> <i class="fas fa-times"></i>`}

  const shots = document.createElement("p")
  shots.classList.add("list-group-item-q")
  if (dog.details["shots_current"]) {
    shots.innerHTML = `<b>Shots current?</b> <i class="fas fa-check"></i>`
  } else {shots.innerHTML = `<b>Shots current?</b> <i class="fas fa-times"></i>`}


  detailsDiv.append(amI, spay, houset, special, shots)
  bioDiv.append(nameTag, bioLeftDiv, detailsDiv)
  photoandbioDiv.append(image, bioDiv)
  dogDiv.append(photoandbioDiv)
}




///// Event Listener call back functions

function leftArrowClicked(event) {
  currentDogId--
  if (currentDogId === 0) {
    currentDogId++
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
    currentDogId--
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
  document.querySelector(".agency-top-tap").style = "background-color: #f2e3c9; border-radius: 5px;"

  const dogBioDiv = document.getElementById("dog-bio")

  fetch(`http://localhost:3000/pets/${currentDogId}`)
  .then(res => res.json())
  .then(dog => {
    dogBioDiv.innerHTML = ""
    dogBioDiv.classList.add("list-group", "list-group-flush", "agency-details")
    const info = [dog["contact"]["email"], dog["contact"]["phone"], dog["contact"]["address"]["address1"], dog["contact"]["address"]["address2"], dog["contact"]["address"]["city"], dog["contact"]["address"]["state"], dog["contact"]["address"]["postcode"]]

    const email = document.createElement("div")
    const phone = document.createElement("div")
    const address = document.createElement("div")
    dogBioDiv.append(email, phone, address)

    email.classList.add("list-group-item", "detail-title")
    phone.classList.add("list-group-item", "detail-title")
    address.classList.add("list-group-item", "detail-title")

    email.innerHTML = `<i class="fas fa-bone"></i> <b>Email</b> <i class="fas fa-bone"></i><p class="list-group-item dog-detail">${info[0]}</p>`

    if (info[1] === null || info[1].trim() === "") {
      phone.innerHTML = `<i class="fas fa-bone"></i> <b>Phone Number</b> <i class="fas fa-bone"></i><p class="list-group-item dog-detail">🐶</p>`
    } else {
      phone.innerHTML = `<i class="fas fa-bone"></i> <b>Phone Number</b> <i class="fas fa-bone"></i><p class="list-group-item dog-detail">${info[1]}</p>`
    }

    if (info[2] === null && info[3] === null) {
      address.innerHTML = `<i class="fas fa-bone"></i> <b>Address</b> <i class="fas fa-bone"></i><p class="list-group-item dog-detail">${info[4]}, ${info[5]} ${info[6]}</p>`
    } else if (info[3] === null) {
      address.innerHTML = `<i class="fas fa-bone"></i> <b>Address</b> <i class="fas fa-bone"></i><p class="list-group-item dog-detail">${info[2]}, ${info[4]}, ${info[5]} ${info[6]}</p>`
    } else {
      address.innerHTML = `<i class="fas fa-bone"></i> <b>Address</b> <i class="fas fa-bone"></i><p class="list-group-item dog-detail">${info[2]} ${info[3]}, ${info[4]}, ${info[5]} ${info[6]}</p>`
    }

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



function dogsavedropped(event) {
  const image = event.target
  if (image.dataset.ontarget === "true") {
  fetch(`http://localhost:3000/users/${currentUser.id}`)
  .then(res => res.json())
  .then(user => {
    if (user.savepets.map((savepet)=>savepet["pet_id"]).includes(currentDogId)) {
      alert(`You already saved ${currentDogName}😂`)}
    else {
    fetch('http://localhost:3000/savepets', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "user_id" : `${currentUser.id}`,
          "pet_id" : `${currentDogId}`
      })
    })
    .then(()=>alert(`Thank you for saving ❤️️${currentDogName} ❤️️`))
    }
    image.dataset.ontarget = false;
  })
  }
}


function draggedOver(event) {
  document.getElementById("dog-image").dataset.ontarget = true
}