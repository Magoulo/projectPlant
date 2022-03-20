//var token = "--- No Token here ---"
/*const express = require('express')
const path = require('path')
const session = require('express-session')
const redis = require("redis")

let RedisStore = require("connect-redis")(session)
	let redisClient = redis.createClient({ legacyMode: true, url: 'redis://redis:6379' })
	redisClient.connect().catch(console.error)

app.use(
	session({
		store: new RedisStore({ client: redisClient }),
		saveUninitialized: false,
		secret: "always tired",
		resave: false,
		
	})
	
)

app.use(function (req, res, next) {
	if (!req.session) {
		return next(new Error("oh no")) // handle error
	}
	next() // otherwise continue
})*/

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
      const token = request.responseText
      sessionStorage.setItem("token", token)
      console.log("responseBody: ", token)
      console.log("sessionStorage: ", sessionStorage.token)
    //  request.session.accessToken = ""
      //request.session.accessToken = token // Uncaught TypeError: Cannot set properties of undefined (setting 'token') at XMLHttpRequest.<anonymous>
     // console.log("request.session.token: ", request.session.accessToken)
        
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