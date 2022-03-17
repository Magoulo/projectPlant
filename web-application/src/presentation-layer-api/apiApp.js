const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const fileUpload = require('express-fileupload')
const session = require('express-session')
const redis = require("redis")
const awilix = require('awilix')
const app = express()
var jwt = require('jsonwebtoken');

module.exports = function ({ }) {
	const router = express.Router()

	// redis@v4 setup----------------------------------------------------------------------
	let RedisStore = require("connect-redis")(session)
	let redisClient = redis.createClient({ legacyMode: true, url: 'redis://redis:6379' })
	redisClient.connect().catch(console.error)

	//express-handlebars setup ------------------------------------------------------------
	app.set('views', path.join(__dirname, 'views'))

	app.engine('hbs', expressHandlebars({
		extname: 'hbs',
		defaultLayout: 'main',
		layoutsDir: path.join(__dirname, 'layouts'),
		partialsDir: path.join(__dirname, 'partials')
	}))


	// Handle static files in the public folder.
	app.use(express.static(path.join(__dirname, 'public')))

	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({
		extended: false
	}))
	console.log("heina?")
	// Add CORS, so client-side code on other websites are allowed
	// to send HTTP requests to us.
	app.use(function (request, response, next) {
		response.setHeader("Access-Control-Allow-Origin", "*")
		response.setHeader("Access-Control-Allow-Methods", "*")
		response.setHeader("Access-Control-Allow-Headers", "*")
		response.setHeader("Access-Control-Expose-Headers", "*")
		next()
	})

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


	//awilix setup---------------------------------------------------------------------------------

	//data-access-layer
	const accountRepository = require('/web-application/src/dal-sequelize/account-repository')
	const adRepository = require('/web-application/src/dal-sequelize/ad-repository')
	const bidRepository = require('/web-application/src/dal-sequelize/bid-repository')
	const userRepository = require('/web-application/src/dal-sequelize/user-repository')

	//business-logic-layer
	const accountManager = require('/web-application/src/business-logic-layer/account-manager')
	const accountValidator = require('/web-application/src/business-logic-layer/account-validator')
	const adManager = require('/web-application/src/business-logic-layer/ad-manager')
	const bidManager = require('/web-application/src/business-logic-layer/bid-manager')
	const userManager = require('/web-application/src/business-logic-layer/user-manager')

	//presentation-layer
	const accountRouter = require('/web-application/src/presentation-layer-api/routers/account-api-router')
	const adRouter = require('/web-application/src/presentation-layer-api/routers/ad-api-router')
	const bidRouter = require('/web-application/src/presentation-layer-api/routers/bid-api-router')
	const userRouter = require('/web-application/src/presentation-layer-api/routers/user-api-router')
	const variousRouter = require('/web-application/src/presentation-layer-api/routers/various-api-router')


	// Creating container and dependencies
	const container = awilix.createContainer()

	//account
	container.register("accountRepository", awilix.asFunction(accountRepository))
	container.register("accountManager", awilix.asFunction(accountManager))
	container.register("accountRouter", awilix.asFunction(accountRouter))
	container.register("accountValidator", awilix.asFunction(accountValidator))

	//ad
	container.register("adRepository", awilix.asFunction(adRepository))
	container.register("adManager", awilix.asFunction(adManager))
	container.register("adRouter", awilix.asFunction(adRouter))

	//bid
	container.register("bidRepository", awilix.asFunction(bidRepository))
	container.register("bidManager", awilix.asFunction(bidManager))
	container.register("bidRouter", awilix.asFunction(bidRouter))

	//user
	container.register("userRepository", awilix.asFunction(userRepository))
	container.register("userManager", awilix.asFunction(userManager))
	container.register("userRouter", awilix.asFunction(userRouter))

	//various
	container.register("variousRouter", awilix.asFunction(variousRouter))


	// routing--------------------------------------------------------------------------------------
	const theAccountRouter = container.resolve("accountRouter")
	const theAdRouter = container.resolve("adRouter")
	const theBidRouter = container.resolve("bidRouter")
	const theUserRouter = container.resolve("userRouter")
	const theVariousRouter = container.resolve("variousRouter")

	app.use('/', theVariousRouter)
	app.use('/accounts', theAccountRouter)
	app.use('/ads', theAdRouter)
	app.use('/bids', theBidRouter)
	app.use('/user', theUserRouter)


	app.listen(3000, function () {
		console.log('Running on 3000!')
	})

	return router
}