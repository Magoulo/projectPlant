/*document.addEventListener('DOMContentLoaded', function () {

  const signInButton = document.getElementById("sign-in-form-button")
  const signInBody = document.getElementById("sign-in-body")
  const signOutBody = document.getElementById("sign-out-body")
  const signOutButton = document.getElementById("sign-out-form-button")

  signInButton.addEventListener('click', function (event) {
    event.preventDefault()

    signOutBody.classList.remove("hidden-sign-in-out")
    signInBody.classList.add("hidden-sign-in-out")
  })

  signOutButton.addEventListener('click', function (event) {
    event.preventDefault()

    signInBody.classList.remove("hidden-sign-in-out")
    signOutBody.classList.add("hidden-sign-in-out")
    showPage("/")
    sessionStorage.setItem("token", "No token here")
    console.log("sessionStorage token: ", sessionStorage.token)
  })

})*/


async function signIn() {
  console.log("inne i signIn()")

  const signInUsername = document.getElementById("sign-in-form-username")
  const signInPassword = document.getElementById("sign-in-form-password")


  const username = signInUsername.value
  const password = signInPassword.value

  // request delen
  const body = JSON.stringify({
    username: username,
    password: password
  })
  console.log("username, password: ", username, password)

  var request = new XMLHttpRequest()
  request.open("POST", "http://localhost:3000/accounts/sign-in")
  request.setRequestHeader("Content-Type", "application/json")
  request.send(body)
  request.addEventListener('load', function (event) {

    const token = JSON.parse(request.responseText)
    sessionStorage.setItem("token", token)

    console.log("sessionStorage token: ", sessionStorage.token)

  })
  //-----------------------



}

/*
newAnchor.addEventListener('click', function () {
  if (toggled) {
    section[previousToggledSectionIndex].classList.toggle("hidden")
  }
  section[i].classList.toggle("hidden")
  previousToggledSectionIndex = i
  toggled = true
})
*/