const express = require('express')
const adManager = require('../../business-logic-layer/ad-manager')
const accountManager = require('../../business-logic-layer/account-manager')
const router = express.Router()

//---------ska vara kvar här------------------------------------

router.get("/", function(request, response){
	adManager.getAllAds(function (errors, Ad) {
            const model = {
            errors: errors,
            Ad: Ad,
			session: request.session
        }
        response.render("start.hbs", model) 
    })
})

router.get("/about", function(request, response){
	const model = {
		session: request.session
	}
	response.render("about.hbs", model)
})

router.get("/contact", function(request, response){
	const model = {
		session: request.session
	}
	response.render("contact.hbs", model)
})

router.get("/myFavorites", function(request, response){
	response.render("myFavorites.hbs")
})

router.get("/personalData", function(request, response){
accountManager.getUserByID(request.session.UserID, function(errors,User){
	const model = {
		errors: errors,
		User: User,
		session: request.session
	}
	response.render("personalData.hbs", model)
})
	
})


module.exports = router