const express = require('express')
const adManager = require('../../business-logic-layer/ad-manager')
const userManager = require('../../business-logic-layer/user-manager')
const router = express.Router()


router.get("/", function (request, response) {

	adManager.getAllAds(function (errors, Ad) {

		userManager.getUserByAccountID(request.session.userID, function (errors, User) {
			const model = {
				errors: errors,
				User: User,
				Ad: Ad,
				session: request.session
			}
			response.render("start.hbs", model)
		})
	})
})

router.get("/about", function (request, response) {

	const model = {
		session: request.session
	}

	response.render("about.hbs", model)
})

router.get("/contact", function (request, response) {

	const model = {
		session: request.session
	}

	response.render("contact.hbs", model)
})

router.get("/myFavoriteAds", function (request, response) {

	const model = {
		session: request.session
	}

	response.render("myFavoriteAds.hbs", model)
})




module.exports = router