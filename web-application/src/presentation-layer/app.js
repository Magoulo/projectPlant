const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')

const session = require('express-session')
let RedisStore = require("connect-redis")(session)

// redis@v4
const redis = require("redis")
console.log("redis: ",redis)
let redisClient = redis.createClient({ legacyMode: true, url: 'redis://redis:6379'})
redisClient.connect().catch(console.error)

const variousRouter = require('./routers/various-router')
const accountRouter = require('./routers/account-router' )
const adRouter = require('./routers/ad-router')

const app = express()

// Setup express-handlebars.
app.set('views', path.join(__dirname, 'views'))

// Note: This code is for an old version of express-handlebars.
// One should use newest version of packages.
app.engine('hbs', expressHandlebars({
	extname: 'hbs',
	defaultLayout: 'main',
	layoutsDir: path.join(__dirname, 'layouts')
}))

// Handle static files in the public folder.
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({
	extended: false
}))

app.use(
	session({
	  store: new RedisStore({ client: redisClient }),
	  saveUninitialized: false,
	  secret: "keyboard cat",
	  resave: false,
	})
)
app.use(function (req, res, next) {
	if (!req.session) {
	  return next(new Error("oh no")) // handle error
	}
	next() // otherwise continue
  })
// Attach all routers.
app.use('/', variousRouter)
app.use('/accounts', accountRouter)
app.use('/ads', adRouter)

// Start listening for incoming HTTP requests!
app.listen(8080, function(){
	console.log('Running on 8080!')
})