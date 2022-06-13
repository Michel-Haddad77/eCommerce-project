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
    //check if the user is an admin
    if(response.data.type == 1){
        console.log(response.data);
        //storing the token in local storage
        let token = response.data.access_token;
        localStorage.setItem("token", token);

        window.location.href = "admin page/admin.html";
    }else{
        alert("you are not an admin");
    }
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