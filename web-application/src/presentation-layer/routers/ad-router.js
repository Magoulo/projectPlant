const express = require('express')
const adManager = require('../../business-logic-layer/ad-manager')
const router = express.Router()

router.get("/", function (request, response) {
    adManager.getAllAds(function (errors, Ad) {
        console.log("Ad: ", Ad)

      ////     console.log("imageBundle: ", imageBundle)
            const model = {
            errors: errors,
            Ad: Ad,
          //  imageBundle: imageBundle
        }
        response.render("ads.hbs", model)
     //   })  
    })
})

router.get('/:adID', function (request, response) {

    const adID = request.params.adID

    adManager.getAdByAdID(adID, function (errors, ad) {
        console.log("--------------inside getAdByadID in ad-router---------------------------")
        console.log("ad: ", ad)

        adManager.getAllBidsByAdID(adID, function (errors, bids) {
            console.log("bids!: ", bids)
            console.log("--------------------------------------------------------------------------------------")
            const model = {
                errors: errors,
                ad: ad,
                bids: bids
            }
            response.render("myAdBids.hbs", model)
        })
    })
})


router.get("/myAds", function (request, response) {
    console.log("inne i myAds")
    response.render("myAds.hbs")
})

router.get("/ad", function (request, response) {
    response.render("ad.hbs")
})

router.get("/adCreate", function (request, response) {
    response.render("adCreate.hbs")
})

router.get("/adDelete", function (request, response) {
    response.render("adDelete.hbs")
})

router.get("/ads", function (request, response) {
    response.render("ads.hbs")
})

router.get("/adUpdate", function (request, response) {
    response.render("adUpdate.hbs")
})


module.exports = router