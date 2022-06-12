async function signIn() {

  const signInUsername = document.getElementById("sign-in-form-username")
  const signInPassword = document.getElementById("sign-in-form-password")

  const signInBody = document.getElementById("sign-in-body")
  const signOutBody = document.getElementById("sign-out-body")
  const menuLoadingSpinner = document.getElementById("menu-loader-spinner")

  const username = signInUsername.value
  const password = signInPassword.value

  //Request body
  const body = JSON.stringify({
    username: username,
    password: password
  })

  timeOut("/")

  //Send sign-in request
  const response = await fetch("http://localhost:3000/accounts/sign-in-sessions", {
    method: 'Post',
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: body
  })

  const statusCode = response.status
  console.log(statusCode)

  //Checking status code
  if (statusCode == 200) {
    response.json().then(data => {
      console.log(data);
      sessionStorage.setItem("accessToken", data.accessToken)
      sessionStorage.setItem("idToken", data.idToken)
    })

    console.log("Welcome: ", username)
    console.log("sessionStorage access token: ", sessionStorage.accessToken)
    console.log("sessionStorage id Token: ", sessionStorage.idToken)

    signInBody.classList.add("hidden-sign-in-out")
    menuLoadingSpinner.classList.remove("hidden-sign-in-out")

    //Simulateing 1 sec delay
    setTimeout(function () {
      signOutBody.classList.remove("hidden-sign-in-out")
      menuLoadingSpinner.classList.add("hidden-sign-in-out")
    }, 1000)

    //Emptying errormessage
    document.getElementById("sign-in-form-error").innerText = ""

    //Adding welcome message
    document.getElementById("Signed-in-account").innerText = "Hello " + username

  } else if (statusCode == 401 || statusCode == 500) {

    signInBody.classList.add("hidden-sign-in-out")
    menuLoadingSpinner.classList.remove("hidden-sign-in-out")

    //Simulateing 1 sec delay
    setTimeout(function () {
      signInBody.classList.remove("hidden-sign-in-out")
      menuLoadingSpinner.classList.add("hidden-sign-in-out")
    }, 1000)

    //Adding errormessages to inputfields
    response.json().then(data => {
      console.log(data);
      document.getElementById("sign-in-form-error").innerText = data[0]
    })
  }

}
