const express = require('express')
const bidManager = require('../../business-logic-layer/bid-manager')
const router = express.Router()
const path = require('path')

router.get("/myBids", function (request, response) {

    bidManager.getAllBidsByUserID(request.session.userID, function (errors, bid) {//userID, function (errors, bid) {
        const model = {
            errors: errors,
            bid: bid,
            session: request.session
        }

        response.render("myBids.hbs", model)
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
                response.render(model)
            } else {
                response.redirect("/ads/" + adID)
            }
        })



    } else {
        const imagePath = request.files.bidImagePath
        const errors = []
        const Ad = { userID: request.session.userID, adID: adID, imagePath: imagePath.name, message: message }

        const uploadPath = path.resolve(__dirname, '../public/images/', imagePath.name)
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

module.exports = router