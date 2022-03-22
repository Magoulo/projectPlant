async function signIn() {

  const signInUsername = document.getElementById("sign-in-form-username")
  const signInPassword = document.getElementById("sign-in-form-password")

  const username = signInUsername.value
  const password = signInPassword.value

  //Request body
  const body = JSON.stringify({
    username: username,
    password: password
  })
  console.log("username, password: ", username, password)


  timeOut("/")

  //Send request
  var request = new XMLHttpRequest()
  request.open("POST", "http://localhost:3000/accounts/sign-in")
  request.setRequestHeader("Content-Type", "application/json")
  request.send(body)
  request.addEventListener('load', function (event) {

    const token = JSON.parse(request.responseText)
    sessionStorage.setItem("token", token)

    console.log("sessionStorage token: ", sessionStorage.token)
  })

}
