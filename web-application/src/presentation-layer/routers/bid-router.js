const express = require('express')
const adManager = require('../../business-logic-layer/bid-manager')
const router = express.Router()

router.get("/myBids", function(request, response){

    adManager.getAllBidsByUserID(request.session.userID, function (errors, bid) {//userID, function (errors, bid) {
            const model = {
                errors: errors,
                bid: bid,
                session: request.session
            }
            
      response.render("myBids.hbs",model)
    })  	
})

module.exports = router