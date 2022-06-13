const axios = require('axios');

window.addEventListener('DOMContentLoaded', () => {
    const log_in_btn = document.getElementById("login-btn");

    //function for log in button on click
    let logIn = (e)=>{
        e.preventDefault();
        let data = new FormData();
      
        data.append('email', document.getElementById("email").value);
        data.append('password', document.getElementById("password").value);
      
        //linking with login api
        axios({
          method: 'post',
          url: 'http://localhost:8000/api/login',
          data: data,
        })
        .then(function (response) {
          //storing the token in local storage
          console.log(response.data);
          let token = response.data.access_token;
          localStorage.setItem("token", token);
    
          //saving logged in user id in local storage
          let id = response.data.id;
          localStorage.setItem("id", id);
    
          window.location.href = "admin page/admin.html";
        })
        .catch(function (error){
            //In case of Unauthorization or invalidation
            //saving the data object in a variable
            console.log(error);
            let data = error.response.data;
            let msg = '';
            
            //loop over the entire data object to aollect all messages
            Object.keys(data).forEach(key =>{
                msg = msg + data[key] + '\n';
            })
            alert(msg);
        })
      }
    
      log_in_btn.addEventListener('click', logIn);

})
