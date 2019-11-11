let signUpButton = document.getElementById('sign_up_button')
let loginForm = document.getElementById('login-form')
let submitForm = document.getElementById('submit-form')
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
var petButton = document.querySelector("#pet-button");

closeButton.addEventListener("click", function() {
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
});

petButton.addEventListener("click", function() {
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
});

/************ RENDERING PET MODAL ******************/

let petCardContainer = document.getElementById('pet-cards')

function renderPetCard() {
    fetch('http://localhost:3000/savepets')
        .then(resp => resp.json())
        .then(resp => {
            console.log('here')
        })
}

function savepetHandler(event) {
    fetch('http://localhost:3000/savepets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user_id" : `${current_user.id}`,
            "pet_id" : `${}`
        })
    })
}