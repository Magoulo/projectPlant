async function loadPersonalData(id) {

    const response = await fetch("http://localhost:3000/user/", {
        method: 'GET',
        headers: new Headers({
            'Authorization': "Bearer " + sessionStorage.accessToken,
        }),
    })

    const statusCode = response.status

    if (statusCode == 200) {

        const user = await response.json()

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

            //Send the data for update
            const response = fetch("http://localhost:3000/user/" + user.id , {
                method: 'Put',
                headers: new Headers({
                    "Content-Type": "application/json",
                    'Authorization': "Bearer " + sessionStorage.accessToken,
                }),
                body: body
            })

            const url = "/accounts/personalData"
            timeOut(url)
            setPushState(url)
        })
    }

    if (statusCode == 500) {

        const pError = document.createElement('p')
        pError.innerText = response.statusText

        const personalDataContainer = document.getElementById('personal-data-container')
        personalDataContainer.insertBefore(pError, personalDataContainer.firstChild)
    }

    if (statusCode == 401) {

        const pError = document.createElement('p')
        pError.innerText = response.statusText

        const personalDataContainer = document.getElementById('personal-data-container')
        personalDataContainer.insertBefore(pError, personalDataContainer.firstChild)
    }
}