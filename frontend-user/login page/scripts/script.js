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
      url: 'http://127.0.0.1:8000/api/login',
      data: data,
    })
    .then(function (response) {
      //check if log in was succesfull
      console.log("this is the respons: "+ response);
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
      console.log(error);
    })
  }

  log_in_btn.addEventListener('click', logIn);