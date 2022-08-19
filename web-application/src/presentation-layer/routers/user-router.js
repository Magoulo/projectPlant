const express = require('express')
const csrf = require('csurf')
const csrfProtection = csrf()

module.exports = function ({ userManager, adManager, bidManager, helperFunctions }) {
    const router = express.Router()

    router.get("/ads", csrfProtection, function (request, response) {

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
                        session: request.session,
                        layout: 'account.hbs',
                        csrfToken: request.csrfToken()
                    }

                    response.render("myAds.hbs", model)
                } else {

                    allAds = Ad

                    model = {
                        Ad: Ad,
                        session: request.session,
                        layout: 'account.hbs',
                        csrfToken: request.csrfToken()
                    }
                }
            })

            adManager.getAllAdsBidsUsersByUserID(userID, function (errors, adOffers) {
                if (errors.length !== 0) {

                    const model = {
                        errors: errors,
                        adOffers: adOffers,
                        session: request.session,
                        layout: 'account.hbs',
                        csrfToken: request.csrfToken()
                    }

                    response.render("myAds.hbs", model)
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

                    response.render("myAds.hbs", model)
                }
            })
        }
    })

    router.get("/bids", csrfProtection, function (request, response) {

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
                    session: request.session,
                    bidAccepted: bidAccepted,
                    bidPending: bidPending,
                    bidDeclined: bidDeclined,
                    layout: 'account.hbs',
                    csrfToken: request.csrfToken()
                }

                response.render("myBids.hbs", model)
            })
        }
    })

    router.get("/personal-data", csrfProtection, function (request, response) {
        const session = request.session

        if (helperFunctions.userIsLoggedIn(session)) {
            response.render("notAuthorized.hbs")

        } else {
            userManager.getUserByUserID(request.session.userID, function (errors, User) {

                const model = {
                    errors: errors,
                    User: User,
                    session: request.session,
                    layout: 'account.hbs',
                    csrfToken: request.csrfToken()
                }

                response.render("personalData.hbs", model)
            })
        }
    })

    router.post('/personal-data/:userID/update', csrfProtection, function (request, response) {

        const userID = request.params.userID
        const firstName = request.body.firstName
        const lastName = request.body.lastName
        const email = request.body.email
        const phoneNumber = request.body.phoneNumber
        const city = request.body.city

        const User = { id: userID, firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber, city: city }

        userManager.updateUserByUserID(User, function (error) {

            if (error.length !== 0) {

                const firstNameErrors = error[0]
                const lastNameErrors = error[1]
                const emailErrors = error[2]
                const phoneNumberErrors = error[3]
                const cityErrors = error[4]

                model = {
                    User,
                    error,
                    firstNameErrors,
                    lastNameErrors,
                    emailErrors,
                    phoneNumberErrors,
                    cityErrors,
                    session: request.session,
                    layout: 'account.hbs',
                    csrfToken: request.csrfToken()
                }

                response.render('personalData.hbs', model)
            } else {

                model = {
                    User,
                    msg: "The update of personal data has been carried out successfully",
                    session: request.session,
                    layout: 'account.hbs',
                    csrfToken: request.csrfToken()
                }

                response.render('personalData.hbs', model)
            }
        })

    })

    return router
}