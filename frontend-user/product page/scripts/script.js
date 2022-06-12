//Authenticated user token
var token = localStorage.getItem("token");

//linking to profile api to display the user's name
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

//make the logout button visible when user hovers over the name
const logout = document.getElementById("logout-container")
document.getElementById("username").addEventListener('mouseover',() =>{
  logout.style.visibility = "visible";
});

logout.addEventListener('mouseleave', ()=>{
  logout.style.visibility = "hidden";
})


//function called when logout buttn is pressed
let logOut = (e)=>{
    e.preventDefault();
  
    //linking to logout api
    axios({
        method: 'post',
        url: 'http://localhost:8000/api/logout',
        headers: {
        'Authorization': 'Bearer ' + token
        },
    })
    .then(function (response) {
        console.log(response.data.message);
        localStorage.clear();
        window.location.href = "../login page/sign-in.html"
    })
}

//add click listener to the logout button
document.getElementById("logout-btn").addEventListener('click', logOut);

//linking with get_all_products api to get a single product

//get product_id from local storage
var product_id = localStorage.getItem("clicked_product_id");

axios({
    method: 'get',
    url: 'http://localhost:8000/api/all_products/' + product_id,
  })
.then(function (response) {
  let product = response.data.data;

  let id = product.id;
  let name = product.name;
  let price = product.price;
  let category = product.category;
  let is_favorite = false;

  //check if the product is a favorite using an API
  let data = new FormData();

  data.append('user_id', localStorage.getItem("id"));
  data.append('product_id', id);

  axios({
    method: 'post',
    url: 'http://localhost:8000/api/user/check_favorite',
    data: data,
    headers: {
      'Authorization': 'Bearer ' + token
    },
  })
  .then(function (response) {
    //check if it's a favorite
    if(response.data.status){
      is_favorite = true;
      console.log(response.data);
    }
    //call the createProduct function
    createProduct(id,name,price,category,is_favorite)
  })

  //call the createProduct function
  // createProduct(id,name,price,category,is_favorite);  

})

//create a product container
function createProduct(id,name, price, category,is_favorite){

    var product_div = document.getElementById("product-container");

    //creating product img
    const product_img = document.createElement("img");
    product_img.src = "../assets/placeholder.jpg"; //To be changed using base64
    product_img.className = "product-img";
    product_div.appendChild(product_img);

    //create info div
    const info_div = document.createElement("div");
    info_div.className = "info-container";
    product_div.appendChild(info_div);

    //creating the header h1
    const product_name = document.createElement("h1");
    product_name.innerHTML = name;
    info_div.appendChild(product_name);

    //Creating the category h5
    const product_categ = document.createElement("h5");
    product_categ.innerHTML = category;
    info_div.appendChild(product_categ);

    //creating the price h3
    const product_price = document.createElement("h3");
    product_price.className = "price";
    product_price.innerHTML = price +"$";
    info_div.appendChild(product_price);

    //creating the add to favorites div
    const favorite_div = document.createElement("div");
    favorite_div.className = "fa-container";
    info_div.appendChild(favorite_div);

    //creating the add to favorites icon
    const favorite_icon = document.createElement("i");
    favorite_icon.classList.add("fa-solid");
    favorite_icon.classList.add("fa-heart");
    favorite_icon.classList.add("fa-xl");
    //give product id to icon id
    favorite_icon.id = id;
    favorite_icon.onclick = toggleFavorite;

    //check if the product is favorited and change the color to red
    if(is_favorite){
      favorite_icon.classList.add("red");
    }
    favorite_div.appendChild(favorite_icon)
}

//when user clicks on home in the nav bar
document.getElementById("home").addEventListener('click', ()=>{
    window.location.href = "../signed-in explore page/explore.html";
})


//function called when user alicks on favorite button
function toggleFavorite(){
  //saved the button element in a variable
  var favorite_button = this;

  let data = new FormData();

  data.append('user_id', localStorage.getItem("id"));
  //get the product id saved in the button
  data.append('product_id', this.id);

  //linking to toggle favorites api
  axios({
    method: 'post',
    url: 'http://localhost:8000/api/user/toggle_favorite',
    data: data,
    headers: {
    'Authorization': 'Bearer ' + token
    },
  })
  .then(function (response) {
    alert(response.data.status);
    if(response.data.status === "Added to favorites"){
      favorite_button.classList.add("red"); 
    }else{
      favorite_button.classList.remove("red");
    }
  })
  .catch(function(error){
    //checking the error
    alert(JSON.stringify(error.response.data));
  })
}
