// document.addEventListener("DONContentLoaded", ()=>{


// })

// function([string1, string2],target id,[color1,color2])    
consoleText(['Welcome to the FloofFinder!', 'These cute faces need your love!!!'], 'text',['#cd3b36','#cd3b36']);

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





fetch("http://localhost:3000/pets")
.then(res => res.json())
.then(petsArray => renderDog(petsArray[0]))

function renderDog(dog) {
  const panel = document.getElementById("panel-container")
  panel.innerHTML = ""
  const dogDiv = document.createElement("div")
  dogDiv.id = "dog-div"
  dogDiv.classList.add("card")


  const toptaps = document.createElement("div")
  toptaps.classList.add("card-header")
  toptaps.innerHTML = `
    <ul class="nav nav-tabs card-header-tabs">
      <li class="nav-item">
        <a class="nav-link active" href="#">Floof</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Agency</a>
      </li>
    </ul>`

  dogDiv.append(toptaps)

  const photoandbioDiv = document.createElement("div")
  photoandbioDiv.id = "photoandbio"
  photoandbioDiv.classList.add("card-body")

  const image = document.createElement("img")
  // image.src = dog.photo[0]
  image.src = "https://image.cnbcfm.com/api/v1/image/105992231-1561667465295gettyimages-521697453.jpeg?v=1561667497&w=740&h=416"
  image.id = "dog-image"

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
  breedTag.innerText = `Breed: ${dog.breed}`
  const contactTag = document.createElement("h5")
  contactTag.innerText = `Contact: ${dog.contact.phone}`
  bioLeftDiv.append(ageTag, breedTag, contactTag)

  const detailsDiv = document.createElement("div")
  detailsDiv.classList.add("bio-right", "card-text")
  detailsDiv.innerHTML = 
  `<p>Spayed? ${dog.details["spayed_neutered"]}</p>
  <p>House trained? ${dog.details["house_trained"]}</p>
  <p>Declawed? ${dog.details["declawed"]}</p>
  <p>Special needs? ${dog.details["special_needs"]}</p>
  <p>Shots current? ${dog.details["shots_current"]}</p>`

  bioDiv.append(nameTag, bioLeftDiv, detailsDiv)
  photoandbioDiv.append(image, bioDiv)
  dogDiv.append(photoandbioDiv)
  panel.append(dogDiv)

}