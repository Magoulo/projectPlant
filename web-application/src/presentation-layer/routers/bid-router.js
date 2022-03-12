const express = require('express')
const path = require('path')

module.exports = function ({ adManager, bidManager }) {
    const router = express.Router()

    router.get("/myBids", function (request, response) {

        var bidAccepted = []
        var bidPending = []
        var bidDeclined = []

        bidManager.getAllBidsByUserID(request.session.userID, function (errors, Bid) {//userID, function (errors, bid) {
          //  console.log("Bid-------------: ", Bid)

            for (index in Bid) {
                console.log("Bid[index].status:",Bid[index].status)

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
                layout: 'account.hbs'
            }

            response.render("myBids.hbs", model)
        })
    })

    router.post("/updateBid/:bidID/:status", function (request, response) {

        const adID = request.body.adID
        const bid = { status: request.params.status, bidID: request.params.bidID }

        if (request.params.status == "Accepted") {
            bidManager.setAllBidsToDeclined(adID, function (error) {

                if (error) {
                    const model = {
                        error: error,
                        session: request.session,
                        layout: 'account.hbs'
                    }

                    response.render("myAds.hbs", model)
                } else {
                    console.log("All bids set to declined")

                    adManager.closeAd(adID, function (error) {
                        if (error) {
                            const model = {
                                error: error,
                                session: request.session
                            }

                            response.render("myAds.hbs", model)
                        } else {
                            console.log("Ad closed successfully")
                        }
                    })
                }
            })
        }

        bidManager.updateBidByBidID(bid, function (error) {
            if (error) {
                const model = {
                    error: error,
                    session: request.session,
                    layout: 'account.hbs'
                }

                response.render("myAds.hbs", model)
            } else {
                response.redirect("/ads/myAds")
            }
        })
    })

    router.post("/placeBid", function (request, response) {

        const adID = request.body.adID
        const message = request.body.message

        if (request.files == null) {

            const imagePath = "no-image.png"
            const errors = []
            const Ad = { userID: request.session.userID, adID: adID, imagePath: imagePath, message: message }

            bidManager.createBid(Ad, function (error) {

                if (error) {
                    const model = {
                        errors: errors,
                        session: request.session
                    }

                    response.render("ad.hbs", model)
                } else {
                    response.redirect("/ads/" + adID)
                }
            })

        } else {
            const imagePath = request.files.bidImagePath
            const uploadPath = path.resolve(__dirname, '../public/images/', imagePath.name)

            const errors = []
            const Ad = { userID: request.session.userID, adID: adID, imagePath: imagePath.name, message: message }

            imagePath.mv(uploadPath, function (error) {
                if (error) {
                    console.log("Error in uploading pathway")
                    errors.push("couldn't upload picture")
                    response.render('adCreate.hbs', errors)
                } else {
                    console.log("file uploaded successfully")
                }
            })

            bidManager.createBid(Ad, function (error) {
                if (error) {
                    const model = {
                        errors: errors,
                        session: request.session
                    }

                    response.render(model)
                } else {
                    response.redirect("/ads/" + adID)
                }
            })
        }
    })

    router.post("/:bidID/delete", function (request, response) {
        const bidID = request.params.bidID

        bidManager.deleteBid(bidID, function (error) {
            if (error) {
                response.redirect("/bids/myBids")

            } else {
                response.redirect("/bids/myBids")
            }
        })
    })

    return router
}