async function loadPersonalData(id) {

    //Fetch ad from REST api
    const response = await fetch("http://localhost:3000/user/personalData", {
        method: 'GET',
        headers: new Headers({
            'Authorization': "bearer " + sessionStorage.token,
        }),
    })
    const user = await response.json()
    console.log("fetched user: ", user)

    //Get all elements in personal data form 
    const personalDataFirstname = document.getElementById("personal-data-firstname")
    const personalDataLastname = document.getElementById("personal-data-lastname")
    const personalDataEmail = document.getElementById("personal-data-email")
    const personalDataPhonenumber = document.getElementById("personal-data-phonenumber")
    const personalDataCity = document.getElementById("personal-data-city")
    const personalDataUpdateButton = document.getElementById("personal-data-update-button")

    //Asign the element data from the fetched user
    personalDataFirstname.value = user.firstName
    personalDataLastname.value = user.lastName
    personalDataEmail.value = user.email
    personalDataPhonenumber.value = user.phoneNumber
    personalDataCity.value = user.city



    //Eventlistener for update button
    personalDataUpdateButton.addEventListener('click', function (event) {
        event.preventDefault()

        //Read the values of the form elements
        let firstname = personalDataFirstname.value
        let lastname = personalDataLastname.value
        let email = personalDataEmail.value
        let phonenumber = personalDataPhonenumber.value
        let city = personalDataCity.value

        //create body
        const body = JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            email: email,
            phonenumber: phonenumber,
            city: city
        })
        console.log("body: ", body)

        //Send the data for delete
        const response = fetch("http://localhost:3000/user//personalData/" + user.id + "/update", {
            method: 'Put',
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: body
        })

        const url = "/accounts/personalData"
        hideCurrentPage()
        showPage(url)
        setPushState(url)
    })
}