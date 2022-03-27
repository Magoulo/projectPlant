const express = require('express')

var jwt = require('jsonwebtoken');
const SECRET = 'lelelelelelelble'


module.exports = function ({ accountManager, userManager }) {
	const router = express.Router()

	/* 
	router.get("/sign-up", function (request, response) {response.render("accounts-sign-up.hbs")})
	router.get("/create", function (request, response) {response.render("accountCreate.hbs")})
	router.get("/sign-in", function (request, response) {response.render("accounts-sign-in.hbs")})
	*/

	router.put("/create", function (request, response) {
		console.log("inne i create account i backend")

		const userName = request.body.username
		const password = request.body.password
		const repeatedPassword = request.body.repeatpassword
		const firstName = request.body.firstname
		const lastName = request.body.lastname
		const email = request.body.email
		const phoneNumber = request.body.phonenumber
		const city = request.body.city

		const account = { username: userName, password: password, repeatedPassword: repeatedPassword, firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber, city: city }

		accountManager.createAccount(account, function (error, userAccount) {

			if (error.length !== 0) {
				response.status(500).json(error)
			} else {
				console.log("Account created")
				console.log("userAccountID: ", userAccount.id)

				const user = { userAccountID: userAccount.id, firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber, city: city }

				userManager.createUser(user, function (error, results) {

					if (error.length !== 0) {
						console.log("error in creating user")
						accountManager.deleteAccountByUserAccountID(userAccount.id, function (error) {
							if (error) {
								response.status(500).json(error)
							} else {
								response.status(418).end()
							}
						})
					} else {
						console.log("account and user created succesfully")
						response.status(201)
					}
				})
			}
		})

	})


	router.post("/sign-in", function (request, response) {
		console.log("inne i sign-in i backenden")

		const grant_type = request.body.grant_type
		const username = request.body.username
		const password = request.body.password

		console.log("username, password: ", username, password)

		accountManager.getAccountByUsername(username, function (errors, UserAccount) {
			if (errors.length == 0) {

				if (username == UserAccount.username && password == UserAccount.passwordHash) {//bcrypt.compareSync(PW, User_accounts.Password))

					const payloadAccessToken = {
						isLoggedIn: true,
						userID: UserAccount.Users.id
					}

					const payloadIdToken = {
						userFirstname: UserAccount.Users.firstName,
						userLastname: UserAccount.Users.lastName,
						userEmail: UserAccount.Users.email,
						userPhonenumber: UserAccount.Users.phoneNumber,
						userCity: UserAccount.Users.city

					}
					console.log("payloadIdToken: ",payloadIdToken)
				

					jwt.sign(payloadAccessToken, SECRET, function (error, accessToken) {
						console.log("the accessToken in backend:", token)

						if (error) {
							response.status(401)
						} else {

							response.status(200).json(
								accessToken,
						
							)

						/*	jwt.sign(payloadIdToken, SECRET, function (error, idToken) {
								console.log("the idToken in backend:", idToken)

								if (error) {
									response.status(401)
								} else {


									response.status(200).json(
										accessToken,
										idToken
									)
								}
							})*/

						}
					})
					// create a dupplicate of jwt.sign
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


	return router
}




// TA BORT INNAN INLÄMMNING

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
