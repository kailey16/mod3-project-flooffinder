

function createUser() {
    panelContainer = document.getElementsByClassName('card')
    document.getElementsByClassName('card').style.height="400px";
    document.getElementById('card-header').innerText ="Create Account"
    document.getElementById('login_button').innerText ="Create Account"
    panelContainer.innerHTML = 
    `<div class="card-header">
                        <h3>Create Account</h3>
                    </div>
    <div class="card-body">
    <form>
        <div class="input-group form-group">
            <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-user"></i></span>
            </div>
            <input type="text" class="form-control" placeholder="username">
        </div>
        <div class="input-group form-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                </div>
                <input type="text" class="form-control" placeholder="phone number">
            </div>
            <div class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                    </div>
                    <input type="text" class="form-control" placeholder="email">
                </div>
        
        <div class="form-group">
            <input type="submit" value="Login" class="btn float-right login_btn">
        </div>
    </form>
</div>`
}