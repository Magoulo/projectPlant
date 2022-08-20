const express = require('express')

module.exports = function ({ adManager, userManager }) {
	const router = express.Router()

	router.get("/", function (request, response) {

		adManager.getAllAds(function (errors, Ad) {

			const model = {
				errors: errors,
				Ad: Ad,
				layout: 'start.hbs',
			}

			response.render("start.hbs", model)
		})
	})

	router.get("/about", function (request, response) {

		userManager.getUserByAccountID(request.session.userID, function (errors, User) {
			const model = {
				errors: errors,
				User: User,
			}

			response.render("about.hbs", model,)
		})
	})

	router.get("/contact", function (request, response) {

		userManager.getUserByAccountID(request.session.userID, function (errors, User) {
			const model = {
				errors: errors,
				User: User,
			}

			response.render("contact.hbs", model)
		})
	})

	return router
}