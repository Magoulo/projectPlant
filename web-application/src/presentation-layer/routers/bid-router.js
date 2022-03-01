const express = require('express')
const bidManager = require('../../business-logic-layer/bid-manager')
const router = express.Router()

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
    //Ad.userID, Ad.adID, date, imagePath, message
    const errors = []
    const message = request.body.message
    const adID = request.body.adID

    const Ad = { userID: request.session.userID, adID: adID, message: message }

    console.log(message);

    bidManager.createBid(Ad, function (error) {

        if (error) {
            const model = {
                errors: errors,
                session: request.session
            }
            response.render(model)
        } else {
            console.log("ja det gick");

            const model = {
                errors: errors,
                Ad: Ad,
                msg: "done yalllllllllllllllllllllllllllllllllllllllll",
                session: request.session
            }
            response.redirect("/ads/" + adID)
        }
    })
})

module.exports = router