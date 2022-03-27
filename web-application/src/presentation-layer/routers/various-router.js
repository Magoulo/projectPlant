const express = require('express')
const nodemailer = require('nodemailer')
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

	router.get("/myFavoriteAds", csrfProtection, function (request, response) {

		const model = {
			session: request.session,
			layout: 'account.hbs',
			csrfToken: request.csrfToken()
		}

		response.render("myFavoriteAds.hbs", model)
	})

	router.post("/mail", csrfProtection, function (request, response) {
		
		const name = request.body.name
		const subject = request.body.subject
		const text = request.body.text

		async function mail() {

			let transporter = nodemailer.createTransport({
				service: "gmail",
				auth: {
					user: "testplantproject@gmail.com",
					pass: "plantProject123",
				},
				tls: {
					rejectUnauthorized: false
				}
			})

			let info = await transporter.sendMail({
				from: name, // sender name
				to: "sabina.ametova1@gmail.com, tim.91.lindstrom@gmail.com", // list of receivers
				subject: subject, // Subject line
				text: text, // plain text body
			})

			const model = {
				msg: "message sent succesfully",
				session: request.session
			}

			response.render("contact.hbs", model)
		}
		mail().catch(console.error);
	})

	return router
}