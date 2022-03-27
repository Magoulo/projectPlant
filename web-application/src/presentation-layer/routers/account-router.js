const express = require('express')
const csrf = require('csurf')
const csrfProtection = csrf()
const bcrypt = require('bcryptjs')

module.exports = function ({ accountManager, userManager }) {
	const router = express.Router()


/*	router.get("/sign-up", function (request, response) { // Don't think this is used
		response.render("accounts-sign-up.hbs", { csrfToken: request.csrfToken() })
	})*/

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

		accountManager.createAccount(account, function (error, userAccount) {
			if (error.length !== 0) {

				const usernameErrors = error[0]
				const passwordErrors = error[1]
				const firstNameErrors = error[2]
				const lastNameErrors = error[3]
				const emailErrors = error[4]
				const phoneNumberErrors = error[5]
				const cityErrors = error[6]

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


		// ------------------------------ Create Account Test ---------------------------------------------------

		/*accountManager.getAllAccounts(function(error,userAccount){
			if(error.length !== 0){
				console.log("error in getAllAccounts")
			} else {
				console.log(userAccount)
			}
		})
		*/

		/*accountManager.createAccount(account, function (error, userAccountID) {
			if(error){
			console.log("error in createAccount")	
			} else {
				console.log("Account created with userAccountID: ", userAccountID)
	
				accountManager.deleteAccountByUserAccountID(userAccountID, function (error) {
					if (error.length !== 0) {
						console.log("Couldn't delete the account")
						console.log("error: ", error)
					} else {
					console.log("Account deleted")
					//Get all accounts to verify?
					accountManager.getAllAccounts(function(error,userAccount){
						if(error.length !== 0){
							console.log("error in getAllAccounts")
						} else {
							console.log(userAccount)
						}
					})
					}
				})
			}
		})*/

	})

	/*router.get("/sign-in", csrfProtection, function (request, response) { // NOt used?
		response.render("accounts-sign-in.hbs", { csrfToken: request.csrfToken() })
	})*/

	router.post("/sign-in", csrfProtection, function (request, response) {

		const username = request.body.username
		const password = request.body.password

		accountManager.getAccountByUsername(username, function (errors, UserAccount) {
			console.log("fetched userAccounts and user: ", UserAccount)

			if (errors.length == 0) {

				if (username == UserAccount.username && bcrypt.compareSync(password, UserAccount.passwordHash)) {//bcrypt.compareSync(PW, User_accounts.Password))
					console.log("Username and Password are correct!")

					request.session.isLoggedIn = true
					request.session.userID = UserAccount.Users.id
					console.log("sessionUserID: ", request.session.userID)

					response.redirect('/')
				} else {
					console.log("Wrong Username or Password")
					errors.push("Wrong Username or Password")

					const model = {
						errors,
						UserAccount,
						csrfToken: request.csrfToken()
					}

					response.render('start.hbs', model)
				}
			} else {
				console.log("Internal server error")
				errors.push("Internal server error")

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


	// TEST---------------------------------------------------------------------------------------------------------------

/*	router.get("/", function (request, response) {
		accountManager.getAllAccounts(function (errors, UserAccounts) {
			const model = {
				errors: errors,
				UserAccounts: UserAccounts,
				csrfToken: request.csrfToken()
			}
			response.render("accounts-list-all.hbs", model)
		})
	})*/

	return router
}
