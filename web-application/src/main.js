const awilix = require('awilix')
const express = require('express')
const app = express()

const webApp = require('/web-application/src/presentation-layer/app.js')
const webApiApp = require('/web-application/src/presentation-layer-api/apiApp.js')

const container = awilix.createContainer()
container.register("webApp", awilix.asFunction(webApp))
container.register("webApiApp", awilix.asFunction(webApiApp))

const theWebAppRouter = container.resolve("webApp")
const theWebApiAppRouter = container.resolve("webApiApp")

app.use('/', theWebAppRouter)
app.use('/api', theWebApiAppRouter)

/*
module.exports = function ({}) {
	const router = express.Router()

    return router
}*/