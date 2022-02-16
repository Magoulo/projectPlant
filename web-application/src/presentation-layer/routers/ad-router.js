const express = require('express')
const adManager = require('../../business-logic-layer/ad-manager')
const router = express.Router()

router.get("/", function (request, response) {
    adManager.getAllAds(function (errors, Ad) {
        console.log("Ad: ", Ad)
		const model = {
			errors: errors,
			Ad: Ad
		}
		response.render("myAds.hbs", model)
	})
})

router.get("/myAds", function (request, response) {
    console.log("inne i myAds")
		response.render("myAds.hbs")
})

router.get("/ad", function(request, response){
	response.render("ad.hbs")
})

router.get("/adCreate", function(request, response){
	response.render("adCreate.hbs")
})

router.get("/adDelete", function(request, response){
	response.render("adDelete.hbs")
})

router.get("/ads", function(request, response){
	response.render("ads.hbs")
})

router.get("/adUpdate", function(request, response){
	response.render("adUpdate.hbs")
})


module.exports = router