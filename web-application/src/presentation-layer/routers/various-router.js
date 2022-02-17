const express = require('express')
const adManager = require('../../business-logic-layer/ad-manager')
const router = express.Router()

//---------ska vara kvar här------------------------------------

router.get("/", function(request, response){
	adManager.getAllAds(function (errors, Ad) {
        console.log("Ad: ", Ad)
            const model = {
            errors: errors,
            Ad: Ad,
        }
        response.render("start.hbs", model) 
    })
})



router.get("/about", function(request, response){
	response.render("about.hbs")
})

router.get("/contact", function(request, response){
	response.render("contact.hbs")
})

//---------------------------------------------------------------



/*
router.get("/ads", function(request, response){
	response.render("ads.hbs")
})*/



router.get("/ad", function(request, response){
	response.render("ad.hbs")
})

router.get("/adCreate", function(request, response){
	response.render("adCreate.hbs")
})

router.get("/adDelete", function(request, response){
	response.render("adDelete.hbs")
})



router.get("/adUpdate", function(request, response){
	response.render("adUpdate.hbs")
})


router.get("/myFavorites", function(request, response){
	response.render("myFavorites.hbs")
})

router.get("/personalData", function(request, response){
	response.render("personalData.hbs")
})






module.exports = router