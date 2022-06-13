var token = localStorage.getItem("token");

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
      //console.log(response.data);
      if(response.data.success){
        alert('Category added succesfully!');
      }
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
  data.append('category_id', document.getElementById("category").id);

  //linking with add-category api
  axios({
    method: 'post',
    url: 'http://localhost:8000/api/admin/add_product',
    data: data,
    headers: {
      'Authorization': 'Bearer ' + token
    },
  })
  .then(function (response) {
    //console.log(response.data);
    if(response.data.success){
      alert('Category added succesfully!');
    }
  })
  .catch(function (error){
    console.log(error);
  })
}

document.getElementById("product-btn").addEventListener('click',addProduct);