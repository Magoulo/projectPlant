async function signIn() {
    console.log("inne i signIn()")
    const username = "kent" //request.body.username
    const password = "123" //request.body.password
   // const data = FormData(document.getElementById("sign-in-form"))
    //document.getElementById("sign-in-form")
    

    const body = JSON.stringify({
        username: username,
        password: password
     })
    console.log("username, password: ", username, password)

    var request = new XMLHttpRequest()
    request.open("POST", "http://localhost:3000/accounts/sign-in")
    request.setRequestHeader("Content-Type", "application/json")
    request.send(body)
    request.addEventListener('load', function(event){
      
      const token = JSON.parse(request.responseText)
      console.log("token--------:", typeof(token))
      sessionStorage.setItem("token", token)
     
      console.log("sessionStorage: ", JSON.stringify(sessionStorage.token))
     
    })

   // console.log("token: ", session.token)


  /*  const response = await fetch("http://localhost:3000/accounts/sign-in", {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(username,password),
    })
    response.setHeader("Allow-Control-Allow-Origin")
    const token = await response.json()
    console.log("token?: ", token)*/

    // the correct request for generating the token: "http://localhost:3000/accounts/sign-in"
}