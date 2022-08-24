const express = require('express')
const path = require('path')

module.exports = function ({ adManager, bidManager }) {
    const router = express.Router()


    //CREATE BID------------------------------------------------------------------------------------
    router.post("/bid-create", function (request, response) {

        const adID = request.body.adID
        const bidMessage = request.body.message
        const session = request.session

        if (!bidManager.userIsLoggedIn(session)) {
            response.render("notAuthorized.hbs")
        } else {
            if (request.files == null) {

                const imagePath = "no-image.png"
                const Bid = { userID: request.session.userID, adID: adID, imagePath: imagePath, message: bidMessage }

                bidManager.createBid(Bid, function (createBidErrors) {
                    if (createBidErrors.length) {

                        adManager.getAdByAdID(adID, function (errors, Ad) {

                            const model = {
                                msgError: createBidErrors,
                                errors: errors,
                                Ad: Ad,
                            }
                            response.render("ad.hbs", model)
                        })
                    } else {

                        adManager.getAdByAdID(adID, function (errors, Ad) {

                            const model = {
                                msg: "Bid has been placed successfully",
                                errors: errors,
                                Ad: Ad,
                            }
                            response.render("ad.hbs", model)
                        })
                    }
                })
            } else {
                const imagePath = request.files.bidImagePath
                const uploadPath = path.resolve(__dirname, '../public/images/', imagePath.name)

                const Bid = { userID: request.session.userID, adID: adID, imagePath: imagePath.name, message: bidMessage }

                imagePath.mv(uploadPath, function (errors) {

                    if (errors) {
                        response.render('adCreateForm.hbs', msgError = "Couldn't upload picture")
                    } else {

                        bidManager.createBid(Bid, function (createBidErrors) {

                            if (createBidErrors.length) {

                                adManager.getAdByAdID(adID, function (adErrors, Ad) {

                                    const model = {
                                        msgError: createBidErrors,
                                        errors: adErrors,
                                        Ad: Ad,
                                    }
                                    response.render("ad.hbs", model)
                                })

                            } else {

                                adManager.getAdByAdID(adID, function (adErrors, Ad) {

                                    const model = {
                                        msg: "Bid has been placed successfully",
                                        errors: adErrors,
                                        Ad: Ad,
                                    }
                                    response.render("ad.hbs", model)
                                })
                            }
                        })
                    }
                })
            }
        }
    })

    //UPDATE BID------------------------------------------------------------------------------------
    router.post("/:bidID/status/:status/update", function (request, response) {

        const adID = request.body.adID
        const sessionID = request.session.userID

        adManager.userHasAccess(adID, sessionID, function (errors, userHasAcces) {
            if (errors.length !== 0) {
                model = {
                    Ad: Ad,
                    errors,
                    layout: 'account.hbs',
                }

                response.render('adUpdateForm.hbs', model)
            } else {

                if (!userHasAcces) {
                    response.render("notAuthorized.hbs")
                } else {

                    const bid = { status: request.params.status, bidID: request.params.bidID }

                    if (request.params.status == "Accepted") {
                        bidManager.setAllBidsToDeclined(adID, function (errors) {

                            if (errors.length !== 0) {
                                const model = {
                                    error: errors,
                                    layout: 'account.hbs',
                                }

                                response.render("personalAds.hbs", model)
                            } else {

                                adManager.closeAd(adID, function (adErrors) {
                                    if (adErrors.length !== 0) {

                                        const model = {
                                            error: adErrors,
                                        }

                                        response.render("personalAds.hbs", model)
                                    } else {
                                        console.log("Ad closed successfully")
                                    }
                                })
                            }
                        })
                    }

                    bidManager.updateBidByBidID(bid, function (errors) {
                        if (errors.length !== 0) {

                            const model = {
                                error: errors,
                                layout: 'account.hbs',
                            }

                            response.render("personalAds.hbs", model)
                        } else {
                            response.redirect("/my-account/ads")
                        }
                    })
                }
            }
        })
    })

    //DELETE BID------------------------------------------------------------------------------------
    router.post("/:bidID/delete", function (request, response) {
        const bidID = request.params.bidID
        const sessionID = request.session.userID

        bidManager.userHasAccess(bidID, sessionID, function (errors, userHasAccess) {
            if (errors.length !== 0) {
                model = {
                    Ad: Ad,
                    errors,
                    layout: 'account.hbs',
                }
                response.render('adUpdate.hbs', model)
            } else {
                if (!userHasAccess) {
                    response.render("notAuthorized.hbs")
                } else {

                    bidManager.deleteBid(bidID, function (errors) {
                        if (errors) {
                            response.redirect("/my-account/bids")
                        } else {
                            response.redirect("/my-account/bids")
                        }
                    })
                }
            }
        })
    })

    return router
}