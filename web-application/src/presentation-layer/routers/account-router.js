const express = require('express')
const csrf = require('csurf')
const csrfProtection = csrf()

module.exports = function ({ accountManager, userManager }) {
	const router = express.Router()

	router.get("/create", csrfProtection, function (request, response) {
		response.render("accountCreate.hbs", { csrfToken: request.csrfToken() })
	})

	router.post("/create", csrfProtection, function (request, response) {

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
					csrfToken: request.csrfToken()
				}

				response.render('accountCreate.hbs', model)
			} else {

				const user = { userAccountID: userAccount.id, firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber, city: city }
				const errors = []

				userManager.createUser(user, function (error, results) {
					if (error.length !== 0) {

						errors.push("Internal server error")

						accountManager.deleteAccountByUserAccountID(userAccount.id, function (error) {
							if (error.length !== 0) {

								errors.push(": couldn't resolve the problem")

								model = {
									msgError: errors,
									userName,
									firstName,
									lastName,
									email,
									phoneNumber,
									city,
									csrfToken: request.csrfToken()
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
									csrfToken: request.csrfToken()
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

	router.post("/sign-in", csrfProtection, function (request, response) {

		const username = request.body.username
		const password = request.body.password

		const UsernamePasswordInput = {username: username, password: password}

		accountManager.getAccountByUsername(username, function (errors, UserAccount) {

			if (errors.length == 0) {

				if(accountManager.isCorrectPassword(UsernamePasswordInput, UserAccount)){
					console.log("Username and Password are correct!")

					request.session.isLoggedIn = true
					request.session.userID = UserAccount.Users.id

					response.redirect('/')
				} else {
					errors.push("Wrong Username or Password")

					const model = {
						errors,
						UserAccount,
						csrfToken: request.csrfToken()
					}

					response.render('start.hbs', model)
				}
			} else {

				const model = {
					errors,
					csrfToken: request.csrfToken()
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
