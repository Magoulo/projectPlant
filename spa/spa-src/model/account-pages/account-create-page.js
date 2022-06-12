async function createAccount() {

    const createFormCreateButton = document.getElementById("create-account-create-button")

    createFormCreateButton.addEventListener('click', function (event) {
        event.preventDefault()
    })
}

async function sendCreateAccount() {

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

    //Send the data to create account 
    const response = await fetch("http://localhost:3000/accounts/", {
        method: 'Post',
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: body
    })

    const statusCode = response.status

    if (statusCode == 201) {

        //Empty inputfields in create form
        document.getElementById("create-account-username").value = ""
        document.getElementById("create-account-password").value = ""
        document.getElementById("create-account-repeat-password").value = ""
        document.getElementById("create-account-firstname").value = ""
        document.getElementById("create-account-lastname").value = ""
        document.getElementById("create-account-email").value = ""
        document.getElementById("create-account-phonenumber").value = ""
        document.getElementById("create-account-city").value = ""

        //Empty error fields in form
        document.getElementById("create-account-form-username-error").innerText = ""
        document.getElementById("create-account-form-password-error").innerText = ""
        document.getElementById("create-account-form-repeatpassword-error").innerText = ""
        document.getElementById("create-account-form-firstname-error").innerText = ""
        document.getElementById("create-account-form-lastname-error").innerText = ""
        document.getElementById("create-account-form-email-error").innerText = ""
        document.getElementById("create-account-form-phonenumber-error").innerText = ""
        document.getElementById("create-account-form-city-error").innerText = ""

        const url = "/"
        timeOut(url)
        setPushState(url)

    } else if (statusCode == 500 || statusCode == 418) {
        response.json().then(data => {

            document.getElementById("create-account-form-username-error").innerText = data[0]
            document.getElementById("create-account-form-password-error").innerText = data[1]
            document.getElementById("create-account-form-repeatpassword-error").innerText = data[1]
            document.getElementById("create-account-form-firstname-error").innerText = data[2]
            document.getElementById("create-account-form-lastname-error").innerText = data[3]
            document.getElementById("create-account-form-email-error").innerText = data[4]
            document.getElementById("create-account-form-phonenumber-error").innerText = data[5]
            document.getElementById("create-account-form-city-error").innerText = data[6]
        })
    }
}