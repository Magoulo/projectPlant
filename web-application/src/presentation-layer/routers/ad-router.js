const express = require('express')
const adManager = require('../../business-logic-layer/ad-manager')
const router = express.Router()

router.get("/", function (request, response) {
    adManager.getAllAds(function (errors, Ad) {
            const model = {
            errors: errors,
            Ad: Ad,
            session: request.session
        }
        response.render("ads.hbs", model) 
    })
})

router.get("/myAds", function (request, response) {

    adManager.getAllAdsByUserID(request.session.userID, function (errors, ad) {//userID, function (errors, ad) {
            const model = {
                errors: errors,
                ad: ad,
                session: request.session
            }
       response.render("myAds.hbs", model)
    })  
})

router.get("/adUpdate/:adID", function (request, response) {
    const adID = request.params.adID

    adManager.getAdByAdID(adID, function (errors,ad) {//userID, function (errors, bid) {
        const model = {
            errors: errors,
            ad:ad,
            session: request.session
        }
  response.render("adUpdate.hbs",model)
})  	
})

router.get('/myAds/:userID', function (request, response) {
    const userID = request.params.userID

    adManager.getAllAdsBidsUsersByUserID(userID, function (errors, ad) {
        var adAccepted = []
        var adPending = []
        var adDeclined = []
        for(index in ad){
        //    console.log("status!!!!!!!!!!!!!-----------------------------------------: ",ad[index].status)
            if(ad[index].status == "Accepted"){
          //      console.log("Accepted!!!!---------------------------: ")
                adAccepted.push(ad[index])
            }
            if(ad[index].status == "Pending"){
          //      console.log("Pending!!!!---------------------------: ")
                adPending.push(ad[index])
            }
            if(ad[index].status == "Declined"){
            //    console.log("Declined!!!!---------------------------: ")
                adDeclined.push(ad[index])
            }
        }
     /*   console.log("-----------------------------------------------------------------------------")
        console.log("ad: ", ad)
        console.log("adAccepted: ",adAccepted)
        console.log("adPending: ",adPending)
        console.log("adDeclined: ", adDeclined)
        console.log("-----------------------------------------------------------------------------")*/
        const model = {
            errors: errors,
            adAccepted,
            adPending,
            adDeclined          
        }
        response.render("myAdBids.hbs", model)
    })
})

router.get('/:adID', function (request, response) {
    const adID = request.params.adID

    adManager.getAdByAdID(adID, function (errors, ad) {

        adManager.getUserByUserID(ad.userID, function(errors,user){
            const model = {
                errors: errors,
                ad: ad,
                user: user,
                session: request.session
            }
            response.render("ad.hbs", model)
        })        
    })
})

router.get("/ad", function (request, response) {
    const model = {
		session: request.session
	}
	response.render("ad.hbs", model)
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




module.exports = router