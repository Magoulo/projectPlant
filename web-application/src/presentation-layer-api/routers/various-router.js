const express = require('express')
const nodemailer = require('nodemailer')

module.exports = function ({ adManager, userManager }) {
	const router = express.Router()

	router.get("/", function (request, response) {

		adManager.getAllAds(function (errors, Ad) {
				response.status(200).json(Ad)
		})
	})

	/* router.get("/about", function (request, response) {}) */
	/* router.get("/contact", function (request, response) {}) */
	/* router.get("/myFavoriteAds", function (request, response) {}) */

	// Ha kvar?
	router.post("/mail", function (request, response) {
		
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
				from: name,
				to: "sabina.ametova1@gmail.com, tim.91.lindstrom@gmail.com",
				subject: subject,
				text: text,
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