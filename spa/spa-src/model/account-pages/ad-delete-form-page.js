async function loadAdDeletePage(id) {

    //Fetch ad from REST api
    const response = await fetch("http://localhost:3000/ads/confirm-delete/" + id, {
        method: 'GET',
        headers: new Headers({
            'Authorization': "Bearer " + sessionStorage.accessToken,
        })
    })

    const ad = await response.json()
    const statusCode = response.status

    if (statusCode == 200) {

        //Get all elements in delete form
        const deleteAdId = document.getElementById("delete-ad-form-ad-id")
        const deleteAdTitle = document.getElementById("ad-delete-title")
        const yesButton = document.getElementById("ad-delete-button-yes")
        const noButton = document.getElementById("ad-delete-button-no")

        //Assign the element data from the fetched ad
        deleteAdId.value = id
        deleteAdTitle.innerText = ad.title

        //Clicklistener for yes-button
        yesButton.addEventListener('click', function (event) {
            event.preventDefault()
        })

        //Clicklistener for no-button
        noButton.addEventListener('click', function (event) {
            event.preventDefault()

            const url = "/my-account/ads"
            hideCurrentPage()
            showPage(url)
            setPushState(url)
        })

    } else if (statusCode == 400 || statusCode == 401) {
        response.json().then(data => {
            document.getElementById("delete-ad-error").innerText = data[0]
        })
    }
}

async function sendAdDelete() {

    const deleteAdId = document.getElementById("delete-ad-form-ad-id")

    //Send the data for delete
    const response = await fetch("http://localhost:3000/ads/" + deleteAdId.value, {
        method: 'Delete',
        headers: new Headers({
            "Content-Type": "application/json",
            'Authorization': "Bearer " + sessionStorage.accessToken,
        }),
    })

    const statusCode = response.status

    if (statusCode == 204) {
        const url = "/my-account/ads"
        timeOut(url)
        setPushState(url)

    } else if (statusCode == 400 || statusCode == 401) {
        response.json().then(data => {
            document.getElementById("delete-ad-error").innerText = data[0]
        })
    }
}
