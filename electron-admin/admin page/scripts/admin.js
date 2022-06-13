function addCategory(){
    let data = new FormData();
  
    data.append('name', document.getElementById("category-name").value);

    //linking with add-category api
    axios({
      method: 'post',
      url: 'http://localhost:8000/api/admin/add_category',
      data: data,
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

document.getElementById("addCateg-btn").addEventListener('click',addCategory);