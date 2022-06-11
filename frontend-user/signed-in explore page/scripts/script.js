
  //linking with login api
  axios({
    method: 'get',
    url: 'http://localhost:8000/api/all_products',
  })
  .then(function (response) {
    let products = response.data.data;
    for(let i=0; i<products.length; i++){
      let id = products[i]["id"];
      let name = products[i]["name"];
      let avg_cost = products[i]["avg_cost"];
      let category = products[i]["category"];

      console.log(name);
    }
  })

