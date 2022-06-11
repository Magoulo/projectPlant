const express = require('express')
var jwt = require('jsonwebtoken');
const SECRET = 'lelelelelelelble'

module.exports = function ({ userManager }) {
    const router = express.Router()

    router.get("/", function (request, response) {

        const authorizationHeader = request.header("Authorization")
        const accessToken = authorizationHeader.substring("Bearer ".length)

        jwt.verify(accessToken, SECRET, function (error, payload) {
            if (error) {
                response.status(401).json(error)
            } else {
                userManager.getUserByUserID(payload.userID, function (errors, User) {

                    if (errors.length !== 0) {
                        response.status(500).json(errors)
                    } else {
                        response.status(200).json(User)
                    }
                })
            }
        })
    })

    router.put('/:userID', function (request, response) {

        const userID = request.params.userID
        const firstName = request.body.firstname
        const lastName = request.body.lastname
        const email = request.body.email
        const phoneNumber = request.body.phonenumber
        const city = request.body.city

        const User = { id: userID, firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber, city: city }

        userManager.updateUserByUserID(User, function (error) {

            if (error.length !== 0) {
                response.status(500).json(error)
            } else {
                response.status(204).end()
            }
        })
    })

    return router
}