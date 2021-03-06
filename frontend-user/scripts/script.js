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
  
//create a product container
function createProduct(all_or_favorites,id,name,price, category){
    var all_products_div = document.getElementById("all-container");

    //creating product container and inserting it in the all products div
    const product_div = document.createElement("div");
    product_div.id = id;
    product_div.className = "product";
    all_products_div.appendChild(product_div);

    //assigning onclick listener to every product div
    product_div.onclick = goToLogin;

    //creating product img
    const product_img = document.createElement("img");
    product_img.src = "./assets/placeholder.jpg";
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

  //function that changes the page to the login page
  function goToLogin(){
    window.location.href = "./login page/sign-in.html";
  }

  //go to login page when clicking sign in button
  document.getElementById("sign-in-btn").addEventListener('click', goToLogin);