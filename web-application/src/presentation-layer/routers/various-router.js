const express = require('express')

const router = express.Router()

router.get("/", function(request, response){
	response.render("start.hbs")
})

router.get("/about", function(request, response){
	response.render("about.hbs")
})

router.get("/contact", function(request, response){
	response.render("contact.hbs")
})

router.get("/accountCreate", function(request, response){
	response.render("accountCreate.hbs")
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

router.get("/myAds", function(request, response){
	response.render("myAds.hbs")
})

router.get("/myBids", function(request, response){
	response.render("myBids.hbs")
})

router.get("/c", function(request, response){
	response.render("contact.hbs")
})
















module.exports = router