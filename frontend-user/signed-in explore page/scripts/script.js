
//linking with get_all_products api
axios({
  method: 'get',
  url: 'http://localhost:8000/api/all_products',
})
.then(function (response) {
  let products = response.data.data;
  //loop over each product
  for(let i=0; i<products.length; i++){
    let id = products[i]["id"];
    let name = products[i]["name"];
    let price = products[i]["price"];
    let category = products[i]["category"];

    //call the createProduct function
    createProduct(true,id,name,price,category);
  }
})

//create a product container to place in all products section or favorites section
function createProduct(all_or_favorites,id,name,price, category){
    //determining the parent container for inserting product(allproducts or favorites)
    if(all_or_favorites){
      var all_products_div = document.getElementById("all-container");
    }else{
      var all_products_div = document.getElementById("favorites-container");
    }

    //creating product container and inserting it in the all products div
    const product_div = document.createElement("div");
    product_div.id = id;
    product_div.className = "product";
    all_products_div.appendChild(product_div);

    //assigning onclick listener to every product div
    product_div.onclick = loadProductPage;

    //creating product img
    const product_img = document.createElement("img");
    product_img.src = "../assets/placeholder.jpg";
    product_img.className = "explore-img";
    product_div.appendChild(product_img);

    //creating th header h4
    const product_name = document.createElement("h4");
    product_name.innerHTML = name;
    product_div.appendChild(product_name);

    //Creating the category
    const product_categ = document.createElement("h5");
    product_categ.innerHTML = category;
    product_div.appendChild(product_categ);

    //creating the price
    const product_price = document.createElement("h3");
    product_price.className = "price";
    product_price.innerHTML = price +"$";
    product_div.appendChild(product_price);

}

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

//get currrent user id form local storage
let id = localStorage.getItem("id");

//linking to get_favorites to display the user's favorites
axios({
  method: 'get',
  url: 'http://localhost:8000/api/get_favorites/' + id,
})
.then(function (response){
  let favorites = response.data.data;
  //loop over each product
  for(let i=0; i<favorites.length; i++){
    let id = favorites[i]["id"];
    let name = favorites[i]["name"];
    let price = favorites[i]["price"];
    let category = favorites[i]["category"];

    //call the createProduct function
    createProduct(false,id,name,price,category);
  }
})

//make the logout button visible when user hovers over the name
const logout = document.getElementById("logout-container")
document.getElementById("username").addEventListener('mouseover',() =>{
  logout.style.visibility = "visible";
});

logout.addEventListener('mouseleave', ()=>{
  logout.style.visibility = "hidden";
});

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

document.getElementById("logout-btn").addEventListener('click', logOut);

//function that gets assigned to every created product div
function loadProductPage(){
  //save the product id in local storage
  localStorage.setItem("clicked_product_id", this.id);
  window.location.href = "../product page/product.html";
};

