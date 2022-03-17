const express = require('express')

module.exports = function ({ accountManager, userManager }) {
	const router = express.Router()


	router.get("/sign-up", function (request, response) {
		response.render("accounts-sign-up.hbs")
	})

	router.get("/create", function (request, response) {
		response.render("accountCreate.hbs")
	})

	router.post("/create", function (request, response) {

		console.log("------------i create")

		const userName = request.body.username
		const password = request.body.password
		const repeatedPassword = request.body.repeatpassword
		const firstname = request.body.firstname
		const lastname = request.body.lastname
		const email = request.body.email
		const phoneNumber = request.body.phonenumber
		const city = request.body.city

		const account = { username: userName, password: password, repeatedPassword: repeatedPassword }
		const errors = []

		if (true) {//password === repeatedPassword
			accountManager.createAccount(account, function (error, userAccount) {

				if (error.length !== 0) {

					const usernameErrors = error[0]
					const passwordErrors = error[1]

					model = {
						errors,
						usernameErrors,
						passwordErrors,
						userName,
						firstname,
						lastname,
						email,
						phoneNumber,
						city
						//   csrfToken: request.csrfToken()
					}

					response.render('accountCreate.hbs', model)
				} else {
					console.log("Account created")
					console.log("userAccountID: ", userAccount.id)

					const user = { userAccountID: userAccount.id, firstName: firstname, lastName: lastname, email: email, phoneNumber: phoneNumber, city: city }

					userManager.createUser(user, function (error, results) {
						console.log("results", results)
						console.log("error: ", error)

						if (error.length !== 0) {
							errors.push("Internal server error")

							accountManager.deleteAccountByUserAccountID(userAccount.id, function (error) {
								if (error.length !== 0) {
									console.log("Couldn't delete the account")
									errors.push("Couldn't delete the account")

									model = {
										errors,
										userName,
										firstname,
										lastname,
										email,
										phoneNumber,
										city
										//   csrfToken: request.csrfToken()
									}

									response.render('accountCreate.hbs', model)
								} else {
									model = {
										errors,
										userName,
										firstname,
										lastname,
										email,
										phoneNumber,
										city,
										results
										//   csrfToken: request.csrfToken()
									}

									response.render('accountCreate.hbs', model)
								}
							})
						} else {
							console.log("account and user created succesfully")
							response.redirect("/")
						}
					})
				}
			})
		} /*else {
			errors.push("Repeat the same password")

			model = {
				errors,
				userName,
				firstname,
				lastname,
				email,
				phoneNumber,
				city
			}

			response.render("accountCreate.hbs", model)
		}*/

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

	router.get("/sign-in", function (request, response) {
		response.render("accounts-sign-in.hbs")
	})

	router.post("/sign-in", function (request, response) {

		const username = request.body.username
		const password = request.body.password

		accountManager.getAccountByUsername(username, function (errors, UserAccount) {
			console.log("fetched userAccounts and user: ", UserAccount)

			if (errors.length == 0) {

				if (username == UserAccount.username && password == UserAccount.passwordHash) {//bcrypt.compareSync(PW, User_accounts.Password))
					console.log("Username and Password are correct!")

					request.session.isLoggedIn = true
					request.session.userID = UserAccount.Users.id // UserAccounts.userAccountID ------------------------------------------------ MySQL
					console.log("sessionUserID: ", request.session.userID)

					response.redirect('/')
				} else {
					console.log("Wrong Username or Password")
					errors.push("Wrong Username or Password")

					const model = {
						errors,
						UserAccount
					}

					response.render('start.hbs', model)
				}
			} else {
				console.log("Internal server error")
				errors.push("Internal server error")

				const model = {
					errors,
					//	csrfToken: request.csrfToken()
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

	router.get("/", function (request, response) {
		accountManager.getAllAccounts(function (errors, UserAccounts) {
			const model = {
				errors: errors,
				UserAccounts: UserAccounts
			}
			response.render("accounts-list-all.hbs", model)
		})
	})

	return router
}
