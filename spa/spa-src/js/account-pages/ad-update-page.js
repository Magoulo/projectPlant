async function loadAdUpdatePage(id){
    console.log("inne i loadADUPDATE")

    const response = await fetch("http://localhost:3000/ads/adUpdate/"+ id)
    const ad = await response.json()
    console.log("fetched ad: ", ad)

    const updateForm = document.getElementById('update-ad-form')
    const updateFormTitle = document.getElementById("update-ad-form-title")
    const updateFormLatinName = document.getElementById("update-ad-form-latinname")
    const updateFormDescription = document.getElementById("update-ad-form-description")
    const updateFormAdId = document.getElementById("update-ad-form-ad-id")
    updateFormAdId.value = id
   
    const coverImage = document.getElementById("update-ad-form-coverimage")
    coverImage.src = "/images/" + ad.ImageBundle.coverImagePath
    
    const firstImage = document.getElementById("update-ad-form-firstimage")
    firstImage.src = "/images/" + ad.ImageBundle.firstImagePath

    const secondImage = document.getElementById("update-ad-form-secondimage")
    secondImage.src = "/images/" + ad.ImageBundle.secondImagePath

    updateFormTitle.value = ad.title
    console.log("updateFormTitle after: ", updateFormTitle.value)

    
    updateFormLatinName.value = ad.latinName
    console.log("updateFormLatinName: ", updateFormLatinName.value)

    
    updateFormDescription.value = ad.description
    console.log("updateFormDescription: ", updateFormDescription.value)
    
    
}

async function sendUpdate(){
  
    const updateFormAdId = document.getElementById("update-ad-form-ad-id")
    const updateFormTitle = document.getElementById("update-ad-form-title")
    const updateFormLatinName = document.getElementById("update-ad-form-latinname")
    const updateFormDescription = document.getElementById("update-ad-form-description")
  
    let titleValue = updateFormTitle.value
    console.log("updateFormTitle.value: ", titleValue);
    console.log("updateFormLatinName.value: ", updateFormLatinName.value);
    console.log("updateFormDescription.value: ", updateFormDescription.value);
    console.log("------------------------------------------------")

    
    const body = JSON.stringify({
        adID: updateFormAdId.value,
        title: updateFormTitle.value,
        latinName: updateFormLatinName.value,
        description: updateFormDescription.value
     })
     console.log("body: ", body)

    
    const response = await fetch("http://localhost:3000/ads/adUpdate/" + updateFormAdId.value + "/update", {
        method: 'Put',
        headers: new Headers({
            'Authorization': "bearer " + sessionStorage.token,
            "Content-Type": "application/json"
        }),
        body: body
    })

    //const updateStatus = await response.json()
    //console.log("updateStatus: ", updateStatus)

}