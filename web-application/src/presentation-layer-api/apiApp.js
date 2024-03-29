const awilix = require('awilix')
const bodyParser = require('body-parser')
const expressHandlebars = require('express-handlebars')
const fileUpload = require('express-fileupload')
const path = require('path')

const express = require('express')
const { response } = require('express')
const app = express()

const port = 3000

//------- SWITCH DATA ACCESS LAYER-------
const MySQL = 'data-access-layer'
const PostgreSQL = 'dal-sequelize'

const dataFile = PostgreSQL
//---------------------------------------

const dalPath = '/web-application/src/' + dataFile + '/'
const bllPath = '/web-application/src/business-logic-layer/'
const plRouterPath = '/web-application/src/presentation-layer-api/routers/'

module.exports = function ({ }) {
	const router = express.Router()

	app.set('views', path.join(__dirname, 'views'))

	app.engine('hbs', expressHandlebars({
		extname: 'hbs',
		defaultLayout: 'main',
		layoutsDir: path.join(__dirname, 'layouts'),
		partialsDir: path.join(__dirname, 'partials')
	}))

	app.use(express.static(path.join(__dirname, 'public')))

	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({
		extended: false
	}))

	app.use(function (request, response, next) {
		response.setHeader("Access-Control-Allow-Origin", "*")
		response.setHeader("Access-Control-Allow-Methods", "*")
		response.setHeader("Access-Control-Allow-Headers", "*")
		response.setHeader("Access-Control-Expose-Headers", "*")

		next()
	})

	app.use(fileUpload())

	//awilix setup---------------------------------------------------------------------------------

	//data-access-layer
	const accountRepository = require(dalPath + 'account-repository')
	const adRepository = require(dalPath + 'ad-repository')
	const userRepository = require(dalPath + 'user-repository')

	//business-logic-layer
	const accountManager = require(bllPath + 'account-manager')
	const adManager = require(bllPath + 'ad-manager')
	const userManager = require(bllPath + 'user-manager')

	const accountValidator = require(bllPath + 'account-validator')
	const adValidator = require(bllPath + 'ad-validator')
	const userValidator = require(bllPath + 'user-validator')

	const helperFunctions = require(bllPath + 'helper-functions')

	//presentation-layer
	const accountRouter = require(plRouterPath + 'account-api-router')
	const adRouter = require(plRouterPath + 'ad-api-router')
	const userRouter = require(plRouterPath + 'user-api-router')
	const variousRouter = require(plRouterPath + 'various-api-router')


	// CONTAINER AND DEPENDENCIES---------------------------------------------------------------------
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
	container.register("adValidator", awilix.asFunction(adValidator))

	//user
	container.register("userRepository", awilix.asFunction(userRepository))
	container.register("userManager", awilix.asFunction(userManager))
	container.register("userRouter", awilix.asFunction(userRouter))
	container.register("userValidator", awilix.asFunction(userValidator))

	//various
	container.register("variousRouter", awilix.asFunction(variousRouter))
	container.register("helperFunctions", awilix.asFunction(helperFunctions))


	// ROUTING--------------------------------------------------------------------------------------
	const theAccountRouter = container.resolve("accountRouter")
	const theAdRouter = container.resolve("adRouter")
	const theUserRouter = container.resolve("userRouter")
	const theVariousRouter = container.resolve("variousRouter")

	app.use('/', theVariousRouter)
	app.use('/accounts', theAccountRouter)
	app.use('/ads', theAdRouter)
	app.use('/my-account', theUserRouter)

	app.listen(port, function () {
		console.log(`Runing on ${port}!`)
	})

	return router
}