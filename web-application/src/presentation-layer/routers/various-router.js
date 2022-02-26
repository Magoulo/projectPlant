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