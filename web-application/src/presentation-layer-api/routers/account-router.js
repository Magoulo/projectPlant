const express = require('express')

module.exports = function ({ accountManager, userManager }) {
	const router = express.Router()


	/* 
	router.get("/sign-up", function (request, response) {response.render("accounts-sign-up.hbs")})

	router.get("/create", function (request, response) {response.render("accountCreate.hbs")})
	*/

	router.put("/create", function (request, response) {

		const userName = request.body.username
		const password = request.body.password
		const repeatedPassword = request.body.repeatpassword
		const firstname = request.body.firstname
		const lastname = request.body.lastname
		const email = request.body.email
		const phoneNumber = request.body.phonenumber
		const city = request.body.city

		const account = { username: userName, passwordHash: password }
		const errors = []

		if (password === repeatedPassword) {
			accountManager.createAccount(account, function (error, userAccountID) {

				if (error) {
					console.log("error in createAccount")
					errors.push("Internal server error")
					response.status(500).json(error)

				} else {
					console.log("Account created")
					console.log("userAccountID: ", userAccountID)

					const user = { userAccountID: userAccountID, firstName: firstname, lastName: lastname, email: email, phoneNumber: phoneNumber, city: city }

					userManager.createUser(user, function (error, results) {

						if (error.length !== 0) {
							errors.push("Internal server error")

							accountManager.deleteAccountByUserAccountID(userAccountID, function (error) {
								if (error) {
									console.log("Couldn't delete the account")
									errors.push("Couldn't delete the account")

									response.status(500).json(error)
								} else {
									response.status(500).json(error)
								}
							})
						} else {
							console.log("account and user created succesfully")
							response.status(201)
						}
					})
				}
			})
		} else {
			errors.push("Repeat the same password")

			response.status(401).json(errors)
		}

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

	/* router.get("/sign-in", function (request, response) {response.render("accounts-sign-in.hbs")}) */

	router.put("/sign-in", function (request, response) {

		const username = request.body.username
		const password = request.body.password

		accountManager.getAccountByUsername(username, function (errors, UserAccounts) {
			if (errors.length == 0) {

				if (username == UserAccounts.username && password == UserAccounts.passwordHash) {//bcrypt.compareSync(PW, User_accounts.Password))
					request.session.isLoggedIn = true
					request.session.userID = UserAccounts.id
					response.status(200)

				} else {
					errors.push("Wrong Username or Password")
					response.status(418).json(errors)
				}
			} else {
				errors.push("Internal server error")
				response.status(500).json(errors)
			}
		})
	})

	router.post('/sign-out', function (request, response) {
		request.session.destroy();
		response.status(200)
	})

	/*
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
	*/

	return router
}
