const express = require('express')

module.exports = function ({ userManager }) {
    const router = express.Router()

    router.get("/personalData", function (request, response) {
        userManager.getUserByUserID(request.session.userID, function (errors, User) {

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
        const firstName = request.body.firstName
        const lastName = request.body.lastName
        const email = request.body.email
        const phoneNumber = request.body.phoneNumber
        const city = request.body.city

        const User = { id: userID, firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber, city: city }


        userManager.updateUserByUserID(User, function (error) { // userManager.updateUserByUserID(userID, firstName, lastName, email, phoneNumber, city, function (error) {

            if (error.length !== 0) {

                const firstNameErrors = error[0]
                const lastNameErrors = error[1]
                const emailErrors = error[2]
                const phoneNumberErrors = error[3]
                const cityErrors = error[4]

                console.log("------------------------------------"+emailErrors);

                model = {
                    User,
                    error,
                    firstNameErrors,
                    lastNameErrors,
                    emailErrors,
                    phoneNumberErrors,
                    cityErrors,
                    session: request.session,
                    layout: 'account.hbs'
                    //   csrfToken: request.csrfToken()
                }

                response.render('personalData.hbs', model)
            } else {

                model = {
                    User,
                    msg: "The update of personal data has been carried out successfully",
                    session: request.session,
                    layout: 'account.hbs'
                    //   csrfToken: request.csrfToken()
                }

                response.render('personalData.hbs', model)
            }
        })

    })

    return router
}