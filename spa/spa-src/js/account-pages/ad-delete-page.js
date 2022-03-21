async function loadAdDeletePage(id){

    //Fetch ad from REST api
    const response = await fetch("http://localhost:3000/ads/adDelete/"+ id)
    const ad = await response.json()
    console.log("fetched ad: ", ad)

    //Get all elements in delete form
    const deleteAdTitle = document.getElementById("ad-delete-title")
    const yesButton = document.getElementById("ad-delete-button-yes")
    const noButton = document.getElementById("ad-delete-button-no")

    //Assign the element data from the fetched ad
    deleteAdTitle.innerText = ad.title
   

    yesButton.addEventListener('click', function (event) {
        event.preventDefault()

         //Send the data for delete
         const response = fetch("http://localhost:3000/ads/adDelete/" + ad.id + "/delete", {
            method: 'Delete',
            headers: new Headers({
                "Content-Type": "application/json"
            }),
        })

        const url = "/accounts/myAds"
        hideCurrentPage()
        showPage(url)
        setPushState(url)
    })

    noButton.addEventListener('click', function (event) {
        event.preventDefault()

        const url = "/accounts/myAds"
        hideCurrentPage()
        showPage(url)
        setPushState(url)
    })
}
/*
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
     console.log("body: ", body)

    //Send the data for update 
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

}*/