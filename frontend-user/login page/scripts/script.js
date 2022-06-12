const sign_up_btn = document.getElementById("sign-up-button");
const log_in_btn = document.getElementById("login-btn");


//function for log in button on click
let logIn = (e)=>{
    e.preventDefault();
    let data = new FormData();
  
    data.append('email', document.getElementById("login-email").value);
    data.append('password', document.getElementById("login-password").value);
  
    //linking with login api
    axios({
      method: 'post',
      url: 'http://localhost:8000/api/login',
      data: data,
    })
    .then(function (response) {
      //storing the token in local storage
      let token = response.data.access_token;
      localStorage.setItem("token", token);

      //saving logged in user id in local storage
      let id = response.data.id;
      localStorage.setItem("id", id);

      window.location.href = "../signed-in explore page/explore.html";
    })
    .catch(function (error){
        //In case of Unauthorization or invalidation
        //saving the data object in a variable
        let data = error.response.data;
        let msg = '';
        
        //loop over the entire data object to aollect all messages
        Object.keys(data).forEach(key =>{
            msg = msg + data[key] + '\n';
        })
        alert(msg);
    })
  }


  //function when clicking sign up button 
let signUpSubmit= (e) =>{
    e.preventDefault();
    let data = new FormData();
  
    data.append('name', document.getElementById("name").value);
    data.append('email', document.getElementById("email").value);
    data.append('password', document.getElementById("password").value);
    data.append('password_confirmation', document.getElementById("confirm-password").value);
  
    //linking with sign up api
    axios({
      method: 'post',
      url: 'http://localhost:8000/api/register',
      data: data,
    })
    .then(function (response) {
      console.log(response.data);
      alert(response.data.user.name + " has successfully registered! \nPlease login to proceed");
    })
    .catch(function (error){
        //In case of Unauthorization or invalidation
        //saving the data object in a variable
        let data = error.response.data;
        let msg = '';
        
        //loop over the entire data object to collect all messages
        Object.keys(data).forEach(key =>{
            msg = msg + data[key] + '\n';
        })
        alert(msg);
    })
}

//Event listeners for signup and login
log_in_btn.addEventListener('click', logIn);
sign_up_btn.addEventListener('click',signUpSubmit);

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("sign-up");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close");

// When the user clicks the button, open the modal 
btn.addEventListener("click", function(){
    modal.style.display = "block";})

// When the user clicks on <span> (x), close the modal
span[0].addEventListener("click", function(){
    modal.style.display = "none";})

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
if (event.target == modal) {
    modal.style.display = "none";
}
}