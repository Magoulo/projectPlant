const express = require('express')

module.exports = function ({ userManager }) {
    const router = express.Router()

    router.get("/", function (request, response) {

        const authorizationHeader = request.header("Authorization")
        const accessToken = authorizationHeader.substring("Bearer ".length)

        var tokenContent
        userManager.isCorrectToken(accessToken, function (verificationResult) {
            tokenContent = verificationResult
        })

        if (tokenContent.errors) {
            response.status(401).json(tokenContent.errors)
        } else {
            userManager.getUserByUserID(tokenContent.payload.userID, function (errors, User) {

                if (errors.length !== 0) {
                    response.status(500).json(errors)
                } else {
                    response.status(200).json(User)
                }
            })
        }
    })

    router.get("/ads", function (request, response) {

        const authorizationHeader = request.header("Authorization")
        const accessToken = authorizationHeader.substring('Bearer '.length)

        var tokenContent = {}
        adManager.isCorrectToken(accessToken, function (verificationResult) {
            tokenContent = verificationResult
        })

        if (tokenContent.errors) {
            response.status(401).end()
        } else {
            adManager.getAllAdsByUserID(tokenContent.payload.userID, function (errors, Ads) {
                if (errors.length !== 0) {
                    response.status(400).json(errors)
                } else {

                    response.status(200).json([Ads])
                }
            })
        }
    })

    router.put('/:userID', function (request, response) {

        const authorizationHeader = request.header("Authorization")
        const accessToken = authorizationHeader.substring("Bearer ".length)

        const userID = request.params.userID
        const firstName = request.body.firstname
        const lastName = request.body.lastname
        const email = request.body.email
        const phoneNumber = request.body.phonenumber
        const city = request.body.city

        const User = { id: userID, firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber, city: city }

        var tokenContent
        userManager.isCorrectToken(accessToken, function (verificationResult) {
            tokenContent = verificationResult
        })

        if (tokenContent.errors) {
            response.status(401).json(tokenContent.errors)
        } else {
            
            userManager.userHasAccess(userID, tokenContent.payload.userID, function (userHasAccess) {
                if (!userHasAccess) {
                    response.status(401).json(["Not authorized"])
                } else {
                    userManager.updateUserByUserID(User, function (errors) {

                        if (errors.length !== 0) {
                            response.status(500).json(errors)
                        } else {
                            response.status(204).end()
                        }
                    })
                }
            })

        }
    })

    return router
}