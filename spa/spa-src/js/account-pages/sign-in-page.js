async function signIn() {
    console.log("inne i signIn()")
    const username = "kent" //request.body.username
    const password = "123" //request.body.password

    const data = {username: username, password: password}
    console.log("username, password: ", username, password)

    var request = new XMLHttpRequest()
    request.open("POST", "http://localhost:3000/accounts/sign-in")
    request.send(data)
    request.addEventListener('load', function(event){
        const responseBody = request.responseText
        console.log("responseBody: ", responseBody)
    })


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