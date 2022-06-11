//linking with login api
axios({
  method: 'get',
  url: 'http://localhost:8000/api/all_products',
})
.then(function (response) {
  //
})
.catch(function (error){
    //In case of Unauthorization or invalidation
    //saving the data object in a variable
    let data = error.response.data;
    let msg = '';
    
    //loop over the entire data object to aollect all messages
    Object.keys(data).forEach(key =>{
        msg = msg + data[key] + '\n';
    })
    alert(msg);
})

