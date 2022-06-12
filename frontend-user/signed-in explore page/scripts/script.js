
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
    createProduct(id,name,price,category);
  }
})

//create a product container
function createProduct(id,name,price, category){
    //creating product container and inserting it in the all products div
    const all_products_div = document.getElementById("all-container");
    const product_div = document.createElement("div");
    product_div.id = id;
    product_div.className = "product";
    all_products_div.appendChild(product_div);

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
var token = localStorage.getItem("")

axios({
  method: 'post',
  url: 'http://localhost:8000/api/profile',
  headers: {
    Authorization: 'Bearer ' + token
  },
}).then(function (response) {
    let username = response.data.name;
    console.log(username);
})