const express = require('express')
var jwt = require('jsonwebtoken');
const SECRET = 'lelelelelelelble'

module.exports = function ({ accountManager, userManager }) {
	const router = express.Router()

	router.post("/", function (request, response) {

		const userName = request.body.username
		const password = request.body.password
		const repeatedPassword = request.body.repeatpassword
		const firstName = request.body.firstname
		const lastName = request.body.lastname
		const email = request.body.email
		const phoneNumber = request.body.phonenumber
		const city = request.body.city

		const account = { username: userName, password: password, repeatedPassword: repeatedPassword, firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber, city: city }

		accountManager.createAccount(account, function (accountErrors, userAccount) {

			if (accountErrors.length !== 0) {
				response.status(500).json(accountErrors)
			} else {
				const user = { userAccountID: userAccount.id, firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber, city: city }

				userManager.createUser(user, function (userErrors, results) {

					if (userErrors.length !== 0) {

						accountManager.deleteAccountByUserAccountID(userAccount.id, function (deleteAccountErrors) {
							if (deleteAccountErrors) {
								response.status(500).json(deleteAccountErrors)
							} else {
								response.status(204).end()
							}
						})
					} else {
						response.status(201).end()
					}
				})
			}
		})

	})

	router.post("/tokens", function (request, response) {

		const username = request.body.username
		const password = request.body.password
		const signInInput = { username: username, password: password }

		var validationErrors = []

		accountManager.getAccountByUsername(username, function (errors, UserAccount) {

			if (errors.length == 0) {

				if (accountManager.isCorrectPassword(signInInput, UserAccount)) {

					const payloadAccessToken = {
						isLoggedIn: true,
						userID: UserAccount.User.id
					}

					const payloadIdToken = {
						Firstname: UserAccount.User.firstName,
						Lastname: UserAccount.User.lastName,
						Email: UserAccount.User.email,
						Phonenumber: UserAccount.User.phoneNumber,
						City: UserAccount.User.city

					}

					jwt.sign(payloadAccessToken, SECRET, function (jwtATSignErrors, accessToken) { // Access Token

						if (jwtATSignErrors) {
							response.status(401).json(jwtATSignErrors)
						} else {

							jwt.sign(payloadIdToken, SECRET, function (jwtITSignErrors, idToken) { // Id Token

								if (jwtITSignErrors) {
									response.status(401).json(jwtITSignErrors)
								} else {

									response.status(200).json(
										{ accessToken, idToken }

									)
								}
							})
						}
					})
				} else {
					validationErrors.push("Wrong Username or Password")
					response.status(401).json(validationErrors)
				}
			} else {
				validationErrors.push("Internal server error")
				response.status(500).json(validationErrors)
			}
		})
	})

	router.post('/sign-out', function (request, response) {
		response.status(200)
	})

	return router
}