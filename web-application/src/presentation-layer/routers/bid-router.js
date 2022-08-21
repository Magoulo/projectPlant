const express = require('express')
const path = require('path')
const csrf = require('csurf')
const csrfProtection = csrf()

module.exports = function ({ adManager, bidManager }) {
    const router = express.Router()

    router.post("/updateBid/:bidID/:status", csrfProtection, function (request, response) {

        const adID = request.body.adID
        const bid = { status: request.params.status, bidID: request.params.bidID }

        if (request.params.status == "Accepted") {
            bidManager.setAllBidsToDeclined(adID, function (error) {

                if (error.length !== 0) {
                    const model = {
                        error: error,
                        session: request.session,
                        layout: 'account.hbs',
                        csrfToken: request.csrfToken()
                    }

                    response.render("personalAds.hbs", model)
                } else {

                    adManager.closeAd(adID, function (error) {
                        if (error.length !== 0) {

                            const model = {
                                error: error,
                                session: request.session,
                                csrfToken: request.csrfToken()
                            }

                            response.render("personalAds.hbs", model)
                        } else {
                            console.log("Ad closed successfully")
                        }
                    })
                }
            })
        }

        bidManager.updateBidByBidID(bid, function (error) {
            if (error.length !== 0) {

                const model = {
                    error: error,
                    session: request.session,
                    layout: 'account.hbs',
                    csrfToken: request.csrfToken()
                }

                response.render("personalAds.hbs", model)
            } else {
                response.redirect("/my-account/ads")
            }
        })
    })

    router.post("/placeBid", csrfProtection, function (request, response) {

        const adID = request.body.adID
        const bidMessage = request.body.message

        if (request.files == null) {

            const imagePath = "no-image.png"
            const Bid = { userID: request.session.userID, adID: adID, imagePath: imagePath, message: bidMessage }

            bidManager.createBid(Bid, function (error) {
                if (error.length) {

                    adManager.getAdByAdID(adID, function (errors, Ad) {

                        const model = {
                            msgError: error,
                            errors: errors,
                            Ad: Ad,
                            session: request.session,
                            csrfToken: request.csrfToken()
                        }
                        response.render("ad.hbs", model)
                    })
                } else {

                    adManager.getAdByAdID(adID, function (errors, Ad) {

                        const model = {
                            msg: "Bid has been placed successfully",
                            errors: errors,
                            Ad: Ad,
                            session: request.session,
                            csrfToken: request.csrfToken()
                        }
                        response.render("ad.hbs", model)
                    })
                }
            })
        } else {
            const imagePath = request.files.bidImagePath
            const uploadPath = path.resolve(__dirname, '../public/images/', imagePath.name)

            const Bid = { userID: request.session.userID, adID: adID, imagePath: imagePath.name, message: bidMessage }

            imagePath.mv(uploadPath, function (error) {

                if (error) {
                    response.render('adCreate.hbs', msgError = "Couldn't upload picture")
                } else {

                    bidManager.createBid(Bid, function (error) {

                        if (error.length) {

                            adManager.getAdByAdID(adID, function (errors, Ad) {

                                const model = {
                                    msgError: error,
                                    errors: errors,
                                    Ad: Ad,
                                    session: request.session,
                                    csrfToken: request.csrfToken()
                                }
                                response.render("ad.hbs", model)
                            })

                        } else {

                            adManager.getAdByAdID(adID, function (errors, Ad) {

                                const model = {
                                    msg: "Bid has been placed successfully",
                                    errors: errors,
                                    Ad: Ad,
                                    session: request.session,
                                    csrfToken: request.csrfToken()
                                }
                                response.render("ad.hbs", model)
                            })
                        }
                    })
                }
            })
        }
    })

    router.post("/:bidID/delete", function (request, response) {
        const bidID = request.params.bidID

        bidManager.deleteBid(bidID, function (error) {
            if (error) {
                response.redirect("/my-account/bids")
            } else {
                response.redirect("/my-account/bids")
            }
        })
    })

    return router
}