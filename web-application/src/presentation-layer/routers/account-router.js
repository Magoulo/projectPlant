const express = require('express')
const accountManager = require('../../business-logic-layer/account-manager')

const router = express.Router()

router.get("/sign-up", function (request, response) {
	response.render("accounts-sign-up.hbs")
})

router.get("/create", function (request, response) {
	response.render("accountCreate.hbs")
})


router.get("/sign-in", function (request, response) {
	response.render("accounts-sign-in.hbs")
})

router.post("/sign-in", function (request, response) {
	const username = request.body.username
	const password = request.body.password

	accountManager.getAccountByUsername(username, function (errors, UserAccounts){

		if(errors.length == 0){	
			if(username == UserAccounts.username && password == UserAccounts.passwordHash){//bcrypt.compareSync(PW, User_accounts.Password))
				console.log("Username and Password are correct!")
					request.session.isLoggedIn = true
					request.session.userID = UserAccounts.userAccountID	
					console.log("sessionUserID: ", request.session.userID)

					response.redirect('/')
			} else {
				console.log("Wrong Username or Password")
				errors.push("Wrong Username or Password")
				const model = {
					errors,
					UserAccounts
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


/* 
router.get('/:username', function (request, response) {

	const username = request.params.username

	accountManager.getAccountByUsername(username, function (errors, account) {

		accountManager.getUserByID(account.userAccountID, function (errors, user) {

			adManager.getAdByUserID(user.userID, function (errors, ad) {

				accountManager.getImageBundleByAdID(ad.adID, function(errors,imageBundle){

					accountManager.getBidByAdID(ad.adID, function(errors, bid){
					const model = {
					errors: errors,
					account: account,
					user: user,
					ad: ad,
					imageBundle: imageBundle,
					bid: bid
				}
				response.render("accounts-show-one.hbs", model)
					})
					
				})		    			
			})
		})
	})

}) */

module.exports = router