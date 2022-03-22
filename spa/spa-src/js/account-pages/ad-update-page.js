async function loadAdUpdatePage(id){

    //Fetch ad from REST api
    const response = await fetch("http://localhost:3000/ads/adUpdate/"+ id)
    const ad = await response.json()
    console.log("fetched ad: ", ad)

    //Get all elements in update form
    const updateFormTitle = document.getElementById("update-ad-form-title")
    const updateFormLatinName = document.getElementById("update-ad-form-latinname")
    const updateFormDescription = document.getElementById("update-ad-form-description")
    const updateFormAdId = document.getElementById("update-ad-form-ad-id")
    const coverImage = document.getElementById("update-ad-form-coverimage")
    const firstImage = document.getElementById("update-ad-form-firstimage")
    const secondImage = document.getElementById("update-ad-form-secondimage")
    const updateButton = document.getElementById("update-ad-update-Button")

    //Asign the element data from the fetched ad
    updateFormAdId.value = id
    coverImage.src = "/images/" + ad.ImageBundle.coverImagePath
    firstImage.src = "/images/" + ad.ImageBundle.firstImagePath
    secondImage.src = "/images/" + ad.ImageBundle.secondImagePath
    updateFormTitle.value = ad.title 
    updateFormLatinName.value = ad.latinName  
    updateFormDescription.value = ad.description   

    //Eventlistener for update button
    updateButton.addEventListener('click', function (event) {
        event.preventDefault()

        const url = "/ads/adUpdate/" + ad.id + "/update"  
        timeOut(url)
       
        setPushState(url)
    })
}

async function sendUpdate(){
    //Get all elements in update form
    const updateFormAdId = document.getElementById("update-ad-form-ad-id")
    const updateFormTitle = document.getElementById("update-ad-form-title")
    const updateFormLatinName = document.getElementById("update-ad-form-latinname")
    const updateFormDescription = document.getElementById("update-ad-form-description")
  
    //Read the values of the form elements
    let adIdValue = updateFormAdId.value
    let titleValue = updateFormTitle.value
    let latinNameValue = updateFormLatinName.value
    let descriptionValue = updateFormDescription.value
   
    //create body
    const body = JSON.stringify({
        adID: adIdValue,
        title: titleValue,
        latinName: latinNameValue,
        description: descriptionValue
     })

    //Send the data for update 
    const response = await fetch("http://localhost:3000/ads/adUpdate/" + updateFormAdId.value + "/update", {
        method: 'Put',
        headers: new Headers({
            'Authorization': "bearer " + sessionStorage.token,
            "Content-Type": "application/json"
        }),
        body: body
    })

}