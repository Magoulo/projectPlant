async function createAccount() {

    const createFormCreateButton = document.getElementById("create-account-create-button")

    createFormCreateButton.addEventListener('click', function (event) {
        event.preventDefault()

        //Get all elements in create form
        const createFormUsername = document.getElementById("create-account-username")
        const createFormPassword = document.getElementById("create-account-password")
        const createFormRepeatPassword = document.getElementById("create-account-repeat-password")
        const createFormFirstname = document.getElementById("create-account-firstname")
        const createFormLastname = document.getElementById("create-account-lastname")
        const createFormEmail = document.getElementById("create-account-email")
        const createFormPhonenumber = document.getElementById("create-account-phonenumber")
        const createFormCity = document.getElementById("create-account-city")

        //Read the values of the form elements
        let username = createFormUsername.value
        let password = createFormPassword.value
        let repeatPassword = createFormRepeatPassword.value
        let firstname = createFormFirstname.value
        let lastname = createFormLastname.value
        let email = createFormEmail.value
        let phonenumber = createFormPhonenumber.value
        let city = createFormCity.value

        //create body
        const body = JSON.stringify({
            username: username,
            password: password,
            repeatpassword: repeatPassword,
            firstname: firstname,
            lastname: lastname,
            email: email,
            phonenumber: phonenumber,
            city: city
        })

        console.log("body: ", body)

        //Send the data to create account 
        const response = fetch("http://localhost:3000/accounts/create", {
            method: 'Put',
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: body
        })

        const url = "/"
        timeOut(url)
        setPushState(url)
    })
}