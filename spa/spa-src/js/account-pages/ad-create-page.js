async function createAd(){

    //Get all elements in create form
    const createFormTitle = document.getElementById("create-ad-title")
    const createFormLatinName = document.getElementById("create-ad-latinname")
    const createFormDescription = document.getElementById("create-ad-description")
   

     //Read the values of the form elements
     let title = createFormTitle.value
     let latinname = createFormLatinName.value
     let description = createFormDescription.value
    
    
     //create body
     const body = JSON.stringify({
        title: title,
        latinname: latinname,
        description: description,
      })

      console.log("body: ", body)
 
     //Send the data to create ad
     const response = await fetch("http://localhost:3000/ads/adCreate", {
         method: 'Put',
         headers: new Headers({
            'Authorization': "bearer " + sessionStorage.token,
            "Content-Type": "application/json"
         }),
         body: body
     })

    const updateStatus = await response.json()
    console.log("updateStatus: ", updateStatus)

}