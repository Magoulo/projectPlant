const session = require('express-session')
let RedisStore = require("connect-redis")(session)
const awilix = require('awilix')


//awilix setup-----------------------------------------------------------------------------------

// Import the ones we want to use (real or mockup), real in this case.

//data-access-layer
const accountRepository = require('/web-application/src/data-access-layer/account-repository')
const adRepository = require('/web-application/src/data-access-layer/ad-repository')
const bidRepository = require('/web-application/src/data-access-layer/bid-repository')
const userRepository = require('/web-application/src/data-access-layer/user-repository')

//business-logic-layer
const accountManager = require('/web-application/src/business-logic-layer/account-manager')
const accountValidator = require('/web-application/src/business-logic-layer/account-validator')
const adManager = require('/web-application/src/business-logic-layer/ad-manager')
const bidManager = require('/web-application/src/business-logic-layer/bid-manager')
const userManager = require('/web-application/src/business-logic-layer/user-manager')

//presintation-layer
const accountRouter = require('/web-application/src/presentation-layer/routers/account-router')
const adRouter = require('/web-application/src/presentation-layer/routers/ad-router')
const bidRouter = require('/web-application/src/presentation-layer/routers/bid-router')
const userRouter = require('/web-application/src/presentation-layer/routers/user-router')
const variousRouter = require('/web-application/src/presentation-layer/routers/various-router')


// Create a container and add the dependencies we want to use.
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


// Retrieve the router, which resolves all other dependencies.
const theAccountRouter = container.resolve("accountRouter")
const theAdRouter = container.resolve("adRouter") 
const theBidRouter = container.resolve("bidRouter") 
const theUserRouter = container.resolve("userRouter") 
const theVariousRouter = container.resolve("variousRouter")

// Attach all routers.
app.use('/', theVariousRouter)
app.use('/accounts', theAccountRouter)
app.use('/ads', theAdRouter)
app.use('/bids',theBidRouter)
app.use('/user', theUserRouter)

