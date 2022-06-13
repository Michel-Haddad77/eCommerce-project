var token = localStorage.getItem("token");


//linking with add-category api
axios({
  method: 'get',
  url: 'http://localhost:8000/api/admin/all_categories',
  headers: {
    'Authorization': 'Bearer ' + token
  },
})
.then(function (response) {
  //console.log(response.data);
  let categories = response.data.data;
  //loop over each product
  for(let i=0; i<categories.length; i++){
    let id = categories[i]["id"];
    let name = categories[i]["name"];

    //call the createProduct function
    createCategory(id,name);
  }
})
.catch(function (error){
  console.log(error);
})

function createCategory(id,name){
  const drop_down = document.getElementById("category");

  const categ_option = document.createElement("option");
  categ_option.value = id;
  categ_option.innerHTML = name;
  drop_down.appendChild(categ_option);
}

//function called when add category button is pressed
function addCategory(){

    let data = new FormData();
  
    data.append('name', document.getElementById("category-name").value);

    //linking with add-category api
    axios({
      method: 'post',
      url: 'http://localhost:8000/api/admin/add_category',
      data: data,
      headers: {
        'Authorization': 'Bearer ' + token
      },
    })
    .then(function (response) {
      alert('Category added succesfully!');
    })
    .catch(function (error){
      console.log(error);
    })
}

document.getElementById("category-btn").addEventListener('click',addCategory);



function addProduct(){

  let data = new FormData();

  data.append('name', document.getElementById("product-name").value);
  data.append('price', document.getElementById("price").value);
  data.append('category_id', document.getElementById("category").value);

  //linking with add-product api
  axios({
    method: 'post',
    url: 'http://localhost:8000/api/admin/add_product',
    data: data,
    headers: {
      'Authorization': 'Bearer ' + token
    },
  })
  .then(function (response) {
    alert('Product added succesfully!');
  })
  .catch(function (error){
    console.log(error);
  })
}

document.getElementById("product-btn").addEventListener('click',addProduct);

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
    window.location.href = "../index.html"
  })
}

document.getElementById("logout-btn").addEventListener('click', logOut);