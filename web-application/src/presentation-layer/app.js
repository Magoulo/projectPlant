const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const fileUpload = require('express-fileupload')

const session = require('express-session')
let RedisStore = require("connect-redis")(session)

// redis@v4
const redis = require("redis")
let redisClient = redis.createClient({ legacyMode: true, url: 'redis://redis:6379'})
redisClient.connect().catch(console.error)

const variousRouter = require('./routers/various-router')
const accountRouter = require('./routers/account-router' )
const adRouter = require('./routers/ad-router')
const bidRouter = require('./routers/bid-router')
const userRouter = require('./routers/user-router')

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

app.use(fileUpload())

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
app.use('/bids', bidRouter)
app.use('/user', userRouter)

app.get('/upload', function (request, response) {
	response.render('uploadpic.hbs')
})

// Start listening for incoming HTTP requests!
app.listen(8080, function(){
	console.log('Running on 8080!')
})