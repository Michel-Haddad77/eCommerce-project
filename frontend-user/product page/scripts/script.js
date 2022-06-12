//linking to profile api to display the user's name
var token = localStorage.getItem("token");

axios({
  method: 'post',
  url: 'http://localhost:8000/api/profile',
  headers: {
    'Authorization': 'Bearer ' + token
  },
})
.then(function (response) {
    let username = response.data.name;
    document.getElementById("username").innerHTML = username;

})
.catch(function(error){
  //checking the error
  //alert(JSON.stringify(error.response.data));
})