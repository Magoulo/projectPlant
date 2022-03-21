async function loadAdDeletePage(id) {

    //Fetch ad from REST api
    const response = await fetch("http://localhost:3000/ads/adDelete/" + id)
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
