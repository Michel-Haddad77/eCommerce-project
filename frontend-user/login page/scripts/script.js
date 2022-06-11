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

      window.location.href = "../index.html";
    //   if(response.data["success"]){
    //     //saving logged in user id in local storage
    //     localStorage.setItem("id", response.data["user_id"]);
    //     if(response.data["type"]=== 1){
    //       window.location.href = "./pages/explore-page/explore.html";
    //     }else{
    //       window.location.href = "./pages/admin-page/admin.html";
    //     }
  
    //   }else{
    //     alert(response.data["response"]); //incorrect email and/or password
    //   }
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

  log_in_btn.addEventListener('click', logIn);