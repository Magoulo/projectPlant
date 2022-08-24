const express = require('express')

module.exports = function ({ accountManager, userManager }) {
	const router = express.Router()

	router.get("/create", function (request, response) {
		response.render("accountCreate.hbs")
	})

	router.post("/create", function (request, response) {

		const userName = request.body.username
		const password = request.body.password
		const repeatedPassword = request.body.repeatPassword
		const firstName = request.body.firstName
		const lastName = request.body.lastName
		const email = request.body.email
		const phoneNumber = request.body.phonenumber
		const city = request.body.city

		const account = { username: userName, password: password, repeatedPassword: repeatedPassword, firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber, city: city }

		accountManager.createAccount(account, function (errors, userAccount) {
			if (errors.length !== 0) {

				const usernameErrors = errors[0]
				const passwordErrors = errors[1]
				const firstNameErrors = errors[2]
				const lastNameErrors = errors[3]
				const emailErrors = errors[4]
				const phoneNumberErrors = errors[5]
				const cityErrors = errors[6]

				model = {
					usernameErrors,
					passwordErrors,
					firstNameErrors,
					lastNameErrors,
					emailErrors,
					phoneNumberErrors,
					cityErrors,
					userName,
					password,
					repeatedPassword,
					firstName,
					lastName,
					email,
					phoneNumber,
					city,
				}

				response.render('accountCreate.hbs', model)
			} else {

				const user = { userAccountID: userAccount.id, firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber, city: city }
				userManager.createUser(user, function (errors, results) {
					if (errors.length !== 0) {

						errors.push("Internal server error")

						accountManager.deleteAccountByUserAccountID(userAccount.id, function (errors) {
							if (errors.length !== 0) {

								errors.push(": couldn't resolve the problem")

								model = {
									msgError: errors,
									userName,
									firstName,
									lastName,
									email,
									phoneNumber,
									city,
								}

								response.render('accountCreate.hbs', model)

							} else {

								errors.push(": please try again")

								model = {
									msgError: errors,
									userName,
									firstName,
									lastName,
									email,
									phoneNumber,
									city,
									results,
								}

								response.render('accountCreate.hbs', model)
							}
						})
					} else {
						response.redirect("/")
					}
				})
			}
		})

	})

	router.post("/sign-in", function (request, response) {

		const username = request.body.username
		const password = request.body.password

		const signInInput = { username: username, password: password }

		accountManager.getAccountByUsername(username, function (errors, UserAccount) {

			if (errors.length == 0) {

				if (accountManager.isCorrectPassword(signInInput, UserAccount)) {

					request.session.isLoggedIn = true
					request.session.userID = UserAccount.User.id

					response.redirect('/')
				} else {
					errors.push("Wrong Username or Password")

					const model = {
						msgError: errors,
						UserAccount,
					}

					response.render('start.hbs', model)
				}
			} else {

				const model = {
					msgError: errors,
				}

				response.render('start.hbs', model)
			}
		})
	})

	router.post('/sign-out', function (request, response) {
		request.session.destroy();
		response.redirect('/')
	})

	return router
}
