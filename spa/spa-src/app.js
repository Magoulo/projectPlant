const express = require('express')
const path = require('path')
const session = require('express-session')
const redis = require("redis")

const app = express()
const port = 6001

app.use(express.static(__dirname))
/*
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

app.use(function (request, response, next) {
		response.setHeader("Access-Control-Allow-Origin", "*")
		response.setHeader("Access-Control-Allow-Methods", "*")
		response.setHeader("Access-Control-Allow-Headers", "*")
		response.setHeader("Access-Control-Expose-Headers", "*")
		next()
	})

	
app.get("*", function(request, response){
	response.sendFile(__dirname+"/index.html")
})


app.listen(port, function(){
	console.log(`listening on ${port}!`)
})