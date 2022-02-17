const express = require('express')
const adManager = require('../../business-logic-layer/ad-manager')
const router = express.Router()

router.get("/", function (request, response) {
    adManager.getAllAds(function (errors, Ad) {
        console.log("Ad: ", Ad)

      //  adManager.getImageBundleByAdID(Ad.adID, function (errors,imageBundle){
     //       console.log("imageBundle: ", imageBundle)
            const model = {
            errors: errors,
            Ad: Ad,
          //  imageBundle: imageBundle
        }
        response.render("ads.hbs", model)
    //    })  
    })
})
router.get("/myBids", function(request, response){
    console.log("inne i myBids")

    adManager.getAllBidsByUserID(1, function (errors, bid) {//userID, function (errors, bid) {
            const model = {
                errors: errors,
                bid: bid,
            }
      response.render("myBids.hbs",model)
    })  	
})

router.get("/myAds", function (request, response) {
    console.log("inne i myAds")

    adManager.getAllAdsByUserID(1, function (errors, ad) {//userID, function (errors, ad) {
        console.log("ad: ", ad)
            const model = {
                errors: errors,
                ad: ad,
            }
       response.render("myAds.hbs", model)
    })  
})
router.get('/:adID', function (request, response) {

    const adID = request.params.adID

    adManager.getAdByAdID(adID, function (errors, ad) {
        console.log("--------------inside getAdByadID in ad-router---------------------------")
        console.log("ad: ", ad)

        adManager.getUserByUserID(ad.userID, function(errors,user){
            console.log("user: ", user)
            const model = {
                errors: errors,
                ad: ad,
                user: user
            }
            response.render("ad.hbs", model)
        })        
    })
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