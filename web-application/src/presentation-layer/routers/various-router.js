const express = require('express')
const adManager = require('../../business-logic-layer/ad-manager')
const userManager = require('../../business-logic-layer/user-manager')
const router = express.Router()
const nodemailer = require('nodemailer')


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

router.post("/mail", function (request, response) {
	const name = request.body.name
	const subject = request.body.subject
	const text = request.body.text

	async function mail() {

		let transporter = nodemailer.createTransport({
			service: "gmail",
			//host: "smtp-relay.gmail.com",
			//port: 587,
			//secure: false, // true for 465, false for other ports
			auth: {
				user: "testplantproject@gmail.com",
				pass: "plantProject123",
			},
			tls: {
				rejectUnauthorized: false
			}
		})

		// send mail with defined transport object
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

/*router.post('/personalData/:userID/update', function (request, response) {//csrfProtection, function (request, response) {
	const userID = request.params.userID
	const firstName = request.body.firstname
	const lastName = request.body.lastname
	const email = request.body.email
	const phoneNumber = request.body.phonenumber
	const city = request.body.city

	 const errors = []//validators.getDonValidationErrors(Name, Description)
	if (errors.length == 0) {
		accountManager.updateUserByUserID(userID, firstName, lastName, email, phoneNumber, city, function (error) {
			console.log("error:", error)
			if (error) {
				errors.push("Internal server error")
				model = {
					errors,
					userID,
					firstName,
					lastName,
					email,
					phoneNumber,
					city,
					session: request.session
				 //   csrfToken: request.csrfToken()
				}
				response.render('personalData.hbs', model)
			}
			else {
				response.redirect('/personalData')
			}
		})
	}
	else { 
		const model = {
			errors,
			userID,
			firstName,
			lastName,
			email,
			phoneNumber,
			city,
			session: request.session
		 //   csrfToken: request.csrfToken()
		}
		response.render('personalData.hbs', model)
	}
})	*/



module.exports = router