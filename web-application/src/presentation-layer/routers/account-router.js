const express = require('express')
const accountManager = require('../../business-logic-layer/account-manager')

const router = express.Router()

router.get("/sign-up", function (request, response) {
	response.render("accounts-sign-up.hbs")
})

router.get("/create", function (request, response) { /* sabbes */
	response.render("accountCreate.hbs")
})


router.get("/sign-in", function (request, response) {
	response.render("accounts-sign-in.hbs")
})

router.get("/", function (request, response) {
	accountManager.getAllAccounts(function (errors, UserAccounts) {
		const model = {
			errors: errors,
			UserAccounts: UserAccounts
		}
		response.render("accounts-list-all.hbs", model)
	})
})

router.get('/:username', function (request, response) {

	const username = request.params.username

	accountManager.getAccountByUsername(username, function (errors, account) {
		console.log("--------------inside getAccountByUsername in account-router---------------------------")
		console.log("account: ", account)

		accountManager.getUserByID(account.userAccountID, function (errors, user) {
			console.log("user:", user)

			accountManager.getAdByUserID(user.userID, function (errors, ad) {
				console.log("ad:", ad)

				accountManager.getImageBundleByAdID(ad.adID, function(errors,imageBundle){
					console.log("imageBundle:", imageBundle)

					accountManager.getBidByAdID(ad.adID, function(errors, bid){
						console.log("bid: ", bid)
						console.log("--------------------------------------------------------------------------------------")
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

})

module.exports = router