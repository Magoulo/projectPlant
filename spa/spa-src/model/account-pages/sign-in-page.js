async function signIn() {

  const signInUsername = document.getElementById("sign-in-form-username")
  const signInPassword = document.getElementById("sign-in-form-password")
  const signInBody = document.getElementById("sign-in-body")
  const signOutBody = document.getElementById("sign-out-body")
  const menuLoadingSpinner = document.getElementById("menu-loader-spinner")
  const loadingTime = 1000

  const username = signInUsername.value
  const password = signInPassword.value

  //Request body
  const body = JSON.stringify({
    username: username,
    password: password
  })

  timeOut("/")

  //Send sign-in request
  const response = await fetch("http://localhost:3000/accounts/tokens", {
    method: 'Post',
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: body
  })

  const statusCode = response.status

  //Checking status code
  if (statusCode == 200) {

    response.json().then(data => {

      sessionStorage.setItem("accessToken", data.accessToken)
      sessionStorage.setItem("idToken", data.idToken)
    })

    signInBody.classList.add("hidden-sign-in-out")
    menuLoadingSpinner.classList.remove("hidden-sign-in-out")

    //Simulateing 1 sec delay
    setTimeout(function () {
      signOutBody.classList.remove("hidden-sign-in-out")
      menuLoadingSpinner.classList.add("hidden-sign-in-out")
    }, loadingTime)

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
    }, loadingTime)

    //Adding errormessages to inputfields
    response.json().then(data => {

      document.getElementById("sign-in-form-error").innerText = data[0]
    })
  }
}
