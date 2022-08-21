const express = require('express')

module.exports = function ({ userManager, adManager, bidManager, helperFunctions }) {
    const router = express.Router()

    router.get("/ads", function (request, response) {

        const userID = request.session.userID
        const session = request.session
        var model = {}
        var allAds = []
        var allBids = []

        if (helperFunctions.userIsLoggedIn(session)) {
            response.render("notAuthorized.hbs")

        } else {
            adManager.getAllAdsByUserID(userID, function (errors, Ad) {

                if (errors.length !== 0) {
                    const model = {
                        errors: errors,
                        Ad: Ad,
                        layout: 'account.hbs',
                    }

                    response.render("personalAds.hbs", model)
                } else {

                    allAds = Ad

                    model = {
                        Ad: Ad,
                        layout: 'account.hbs',
                    }
                }
            })

            adManager.getAllAdsBidsUsersByUserID(userID, function (errors, adOffers) {
                if (errors.length !== 0) {

                    const model = {
                        errors: errors,
                        adOffers: adOffers,
                        layout: 'account.hbs',
                    }

                    response.render("personalAds.hbs", model)
                } else {
                    allBids = adOffers
                    var adAccepted = []

                    for (const ad of allAds) {
                        ad.bids = []

                        for (const bid of allBids) {

                            if (bid.Bids.adID == ad.id && bid.Bids.status == "Pending" && ad.isClosed == false) {
                                ad.bids.push(bid.Bids)
                            }
                            if (bid.Bids.status == "Accepted" && ad.isClosed == true) {
                                adAccepted.push(bid)
                            }
                        }
                    }

                    model.adAccepted = adAccepted

                    response.render("personalAds.hbs", model)
                }
            })
        }
    })

    router.get("/bids", function (request, response) {

        const session = request.session

        var bidAccepted = []
        var bidPending = []
        var bidDeclined = []

        if (helperFunctions.userIsLoggedIn(session)) {
            response.render("notAuthorized.hbs")

        } else {
            bidManager.getAllBidsByUserID(request.session.userID, function (errors, Bid) {

                for (index in Bid) {

                    if (Bid[index].status == "Accepted") {
                        bidAccepted.push(Bid[index])
                    }

                    if (Bid[index].status == "Pending") {
                        bidPending.push(Bid[index])
                    }

                    if (Bid[index].status == "Declined") {
                        bidDeclined.push(Bid[index])
                    }
                }

                const model = {
                    errors: errors,
                    bidAccepted: bidAccepted,
                    bidPending: bidPending,
                    bidDeclined: bidDeclined,
                    layout: 'account.hbs',
                }

                response.render("personalBids.hbs", model)
            })
        }
    })

    router.get("/personal-data", function (request, response) {
        const session = request.session

        if (helperFunctions.userIsLoggedIn(session)) {
            response.render("notAuthorized.hbs")

        } else {
            userManager.getUserByUserID(request.session.userID, function (errors, User) {

                const model = {
                    errors: errors,
                    User: User,
                    layout: 'account.hbs',
                }

                response.render("personalData.hbs", model)
            })
        }
    })

    router.post('/personal-data/:userID/update', function (request, response) {

        const userID = request.params.userID
        const firstName = request.body.firstName
        const lastName = request.body.lastName
        const email = request.body.email
        const phoneNumber = request.body.phoneNumber
        const city = request.body.city
        const sessionID = request.session.userID

        const User = { id: userID, firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber, city: city }

        userManager.userHasAccess(userID, sessionID, function (userHasAccess) {
            if (!userHasAccess) {
                response.render("notAuthorized.hbs")
            } else {
                userManager.updateUserByUserID(User, function (errors) {

                    if (errors.length !== 0) {

                        const firstNameErrors = errors[0]
                        const lastNameErrors = errors[1]
                        const emailErrors = errors[2]
                        const phoneNumberErrors = errors[3]
                        const cityErrors = errors[4]

                        model = {
                            User,
                            error,
                            firstNameErrors,
                            lastNameErrors,
                            emailErrors,
                            phoneNumberErrors,
                            cityErrors,
                            layout: 'account.hbs',
                        }

                        response.render('personalData.hbs', model)
                    } else {

                        model = {
                            User,
                            msg: "The update of personal data has been carried out successfully",
                            layout: 'account.hbs',
                        }

                        response.render('personalData.hbs', model)
                    }
                })
            }
        })
    })

    return router
}