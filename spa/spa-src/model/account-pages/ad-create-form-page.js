async function createAd() {

    const createButton = document.getElementById("create-ad-button")

    createButton.addEventListener('click', function (event) {
        event.preventDefault()
    })
}

async function sendCreateUpdate() {

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

    //Send the data to create ad
    const response = await fetch("http://localhost:3000/ads/", {
        method: 'Post',
        headers: new Headers({
            'Authorization': "Bearer " + sessionStorage.accessToken,
            "Content-Type": "application/json"
        }),
        body: body
    })

    const statusCode = response.status

    if (statusCode == 201) {

        //Empty inputfields in create form
        document.getElementById("create-ad-title").value = ""
        document.getElementById("create-ad-latinname").value = ""
        document.getElementById("create-ad-description").value = ""

        document.getElementById("create-ad-form-title-error").innerText = ""
        document.getElementById("create-ad-form-latinname-error").innerText = ""
        document.getElementById("create-ad-form-description-error").innerText = ""

        const url = "/my-account/ads"
        timeOut(url)
        setPushState(url)

    } else if (statusCode == 400 || statusCode == 401) {
        response.json().then(data => {

            document.getElementById("create-ad-form-title-error").innerText = data[0]
            document.getElementById("create-ad-form-latinname-error").innerText = data[1]
            document.getElementById("create-ad-form-description-error").innerText = data[2]
        })
    }
}
