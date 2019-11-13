let signUpButton = document.getElementById('sign_up_button')
let loginForm = document.getElementById('login-form')
let submitForm = document.getElementById('submit-form')
let petButton = document.getElementById("pet-button");
let currentUser

document.addEventListener("DOMContentLoaded", function(){
    signUpButton.addEventListener("click", createUser)
    loginForm.addEventListener("submit", loginHandler)
})

function loginHandler(event) {
    event.preventDefault()
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name" : `${submitForm.value}`
        })
    })
    .then(resp => resp.json())
    .then(resp => {

        currentUser = resp
        renderDogCard()
    })
    .catch(() => alert("Please enter the valid username."))
}

function signupHandler(event) {

    event.preventDefault()

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name" : `${event.target["name"].value}`,
            "phone_number" : `${event.target["phonenumber"].value}`,
            "email" : `${event.target["email"].value}`
        })
    })
    .then(resp => resp.json())
    .then(resp => {
        currentUser = resp
        renderDogCard()
    })
}

function createUser(event) {
    event.preventDefault()
    panelContainer = document.getElementsByClassName('card')[0]
    panelContainer.style.height="300px";
    document.getElementById('login_header').innerText ="Create Account"
    
    panelContainer.innerHTML = 
    `<div class="card-header">
        <h3>Create Account</h3>
    </div>
    <div class="card-body">
    <form id="sign-up-form">
        <div class="input-group form-group">
            <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-user"></i></span>
            </div>
            <input type="text" class="form-control" name="name" placeholder="username">
        </div>
        <div class="input-group form-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                </div>
                <input type="text" class="form-control" name="phonenumber" placeholder="phone number">
            </div>
            <div class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                    </div>
                    <input type="text" class="form-control" name="email" placeholder="email">
                </div>
        
        <div class="form-group">
            <input type="submit" value="Submit" class="btn float-right login_btn">
        </div>
    </form>
</div>`

let signUpForm = document.getElementById('sign-up-form')
    signUpForm.addEventListener("submit", signupHandler)
}

 /* ----------------- PET BUTTON MODAL --------- */

var modal = document.querySelector("#modal");
var modalOverlay = document.querySelector("#modal-overlay");
var closeButton = document.querySelector("#close-button");


closeButton.addEventListener("click", function() {
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
});

petButton.addEventListener("click", function() {
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
  renderModalCards()
});

/************ RENDERING PET MODAL ******************/

let petCardContainer = document.getElementById('pet-cards')

function renderModalCards() {
    fetch(`http://localhost:3000/users/${currentUser.id}`)
        .then(resp => resp.json())
        .then(user => {

            user.savepets.forEach(savepet => {
                fetch(`http://localhost:3000/pets/${savepet["pet_id"]}`)
                .then(res => res.json())
                .then(pet => {
                    let petContainer = document.createElement('div')
                    petContainer.id = `petContainer-${savepet.id}`
                    petContainer.classList.add('petContainer')

                    petContainer.innerHTML = `
                    <div class="card pet-box" style="width: 18rem;">
                    <div class="fill">
                    <img class="card-img-top" alt="Card image cap" src="${pet.photo[0].medium}">
                    </div>
                    <div class="card-body">
                     <h5 class="card-title">${pet.name}</h5>
                     <a tabindex="0" class="btn btn-primary btn-danger " role="button" data-toggle="popover" data-trigger="focus" title="Dismissible popover" data-content="Email: ${pet["contact"]["email"]} Phone: ${pet["contact"]["phone"]} \n Address: ${pet["contact"]["address"]["address1"]}">Adoption info</a>
                     <button id="${savepet.id}" class="btn btn-primary delete">Delete</button>
    
                     </div>
                    </div>
                    `
                    $(document).ready(function(){
                      $('[data-toggle="popover"]').popover();
                    });
        
                    let modalContainer = document.getElementById('pet-cards')
                    modalContainer.append(petContainer)
                    let dButton = document.getElementById(savepet.id)
                    dButton.addEventListener("click", deleteButton)
                })
            })
        })
    }


function deleteButton(event) {
    let savepetId = event.target.id
    fetch(`http://localhost:3000/savepets/${savepetId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(savepet => {
        const petContainer = document.getElementById(`petContainer-${savepet.id}`)
        petContainer.remove()
    })
}

function savepetHandler(event) {
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
}