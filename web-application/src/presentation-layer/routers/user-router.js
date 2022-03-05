const express = require('express')
const userManager = require('../../business-logic-layer/user-manager')
const router = express.Router()


router.get("/personalData", function (request, response) {

    userManager.getUserByAccountID(request.session.userID, function (errors, User) {
        const model = {
            errors: errors,
            User: User,
            session: request.session,
            layout: 'account.hbs'
        }

        response.render("personalData.hbs", model)
    })
})

router.post('/personalData/:userID/update', function (request, response) {//csrfProtection, function (request, response) {
    const userID = request.params.userID
	const firstName = request.body.firstname
    const lastName = request.body.lastname
    const email = request.body.email
    const phoneNumber = request.body.phonenumber
	const city = request.body.city

     const errors = []//validators.getDonValidationErrors(Name, Description)
    if (errors.length == 0) {
        userManager.updateUserByUserID(userID, firstName, lastName, email, phoneNumber, city, function (error) {
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
					session: request.session,
                    layout: 'account.hbs'
                 //   csrfToken: request.csrfToken()
                }
                response.render('personalData.hbs', model)
            }
            else {
                response.redirect('/user/personalData')
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
			session: request.session,
            layout: 'account.hbs'
         //   csrfToken: request.csrfToken()
        }
        response.render('personalData.hbs', model)
    }
})	

module.exports = router