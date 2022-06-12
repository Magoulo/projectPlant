const express = require('express')
const csrf = require('csurf')
const csrfProtection = csrf()

module.exports = function ({ adManager, userManager }) {
	const router = express.Router()

	router.get("/", csrfProtection, function (request, response) {

		adManager.getAllAds(function (errors, Ad) {

			const model = {
				errors: errors,
				Ad: Ad,
				session: request.session,
				layout: 'start.hbs',
				csrfToken: request.csrfToken()
			}

			response.render("start.hbs", model)
		})
	})

	router.get("/about", csrfProtection, function (request, response) {

		userManager.getUserByAccountID(request.session.userID, function (errors, User) {
			const model = {
				errors: errors,
				User: User,
				session: request.session,
				csrfToken: request.csrfToken()
			}

			response.render("about.hbs", model,)
		})
	})

	router.get("/contact", csrfProtection, function (request, response) {

		userManager.getUserByAccountID(request.session.userID, function (errors, User) {
			const model = {
				errors: errors,
				User: User,
				session: request.session,
				csrfToken: request.csrfToken()
			}

			response.render("contact.hbs", model)
		})
	})

	return router
}