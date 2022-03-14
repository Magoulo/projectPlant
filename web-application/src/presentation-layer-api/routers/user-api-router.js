const express = require('express')

module.exports = function ({ userManager }) {
    const router = express.Router()

    router.get("/personalData", function (request, response) {
        
        const authorizationHeader = request.header("Authorization")
        const accessToken = authorizationHeader.substring("Bearer ".length)

        jwt.verify(accessToken, SECRET, function (error, payload) {
            if (error) {
                response.status(401).end()

            } else {
                userManager.getUserByUserID(payload.userID, function (errors, User) {

                    if(errors){
                        response.status(400).json(errors)
                    } else {
                        response.status(200).json(User)
                    }            
                })

            }
        })
    })

    router.put('/personalData/:userID/update', function (request, response) {

        const userID = request.params.userID
        const firstName = request.body.firstname
        const lastName = request.body.lastname
        const email = request.body.email
        const phoneNumber = request.body.phonenumber
        const city = request.body.city

        const errors = [] //validators.getDonValidationErrors(Name, Description)

        if (errors.length == 0) {

            userManager.updateUserByUserID(userID, firstName, lastName, email, phoneNumber, city, function (error) {

                if (error) {
                    errors.push("Internal server error")
                    response.status(500)
                } else {
                    response.status(204).end()
                }
            })

        } else {
            response.status(418).json(errors)
        }
    })

    return router
}