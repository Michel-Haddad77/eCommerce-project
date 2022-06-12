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

    let name = product.name;
    let price = product.price;
    let category = product.category;

    //call the createProduct function
    createProduct(name,price,category);  
})

//create a product container
function createProduct(name, price, category){

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
    favorite_div.appendChild(favorite_icon)
}
