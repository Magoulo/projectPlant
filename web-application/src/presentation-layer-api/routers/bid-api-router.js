const express = require('express')
const path = require('path')

module.exports = function ({ adManager, bidManager }) {
    const router = express.Router()

    router.get("/myBids", function (request, response) {

        var bidAccepted = []
        var bidPending = []
        var bidDeclined = []

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

            response.status(200).json(Bid)
        })
    })

    router.put("/updateBid/:bidID/:status", function (request, response) {

        const adID = request.body.adID
        const bid = { status: request.params.status, bidID: request.params.bidID }

        if (request.params.status == "Accepted") {

            bidManager.setAllBidsToDeclined(adID, function (error) {
                if (error) {
                    response.status(500).json(error)
                } else {
                    console.log("All bids set to declined")

                    adManager.closeAd(adID, function (error) {
                        if (error) {
                            response.status(500).json(error)
                        } else {
                            console.log("Ad closed successfully")
                        }
                    })
                }
            })
        }

        bidManager.updateBidByBidID(bid, function (error) {
            if (error) {
                response.status(500).json(error)
            } else {
                response.status(204)
            }
        })
    })

    router.put("/placeBid", function (request, response) {

        const adID = request.body.adID
        const message = request.body.message

        if (request.files == null) {

            const imagePath = "no-image.png"
            const errors = []
            const Ad = { userID: request.session.userID, adID: adID, imagePath: imagePath, message: message }

            bidManager.createBid(Ad, function (error) {
                if (error) {
                    response.status(500).json(error)
                } else {
                    response.setHeader("/ads/" + adID).status(200)
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

                    response.status(500).json(error)
                } else {
                    console.log("file uploaded successfully")
                }
            })

            bidManager.createBid(Ad, function (error) {
                console.log("kommer inte ens hit?")
                console.log("Error: ", error)
               
                if (error) {
                    response.status(500).json(error)
                } else {
                    response.setHeader("/ads/" + adID).status(200)
                }
            })
        }
    })

    router.delete("/:bidID/delete", function (request, response) {
        const bidID = request.params.bidID

        bidManager.deleteBid(bidID, function (error) {
            if (error) {
                response.status(404).json(error)
            } else {
                response.status(200)
            }
        })
    })

    return router
}