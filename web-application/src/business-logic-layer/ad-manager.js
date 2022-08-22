module.exports = function ({ adRepository, adValidator, helperFunctions }) {
	return {

		getAllAds: function (callback) {
			adRepository.getAllAds(callback)
		},

		getAdByAdID: function (adID, callback) {
			adRepository.getAdByAdID(adID, callback)
		},

		getAllAdsByUserID: function (userID, callback) {
			adRepository.getAllAdsByUserID(userID, callback)
		},

		getAdByUserID: function (userID, callback) {
			adRepository.getAdByUserID(userID, callback)
		},

		getImageBundleByAdID: function (adID, callback) {
			adRepository.getImageBundleByAdID(adID, callback)
		},

		getAllAdsByTitleOrLatinName: function (title, callback) {
			adRepository.getAllAdsByTitleOrLatinName(title, callback)
		},

		createAd: function (Ad, callback) {

			const errors = adValidator.getAdErrors(Ad)
			var errorsExist = helperFunctions.hasErrors(errors)

			if (errorsExist) {
				callback(errors, null)
			} else {
				adRepository.createAd(Ad, callback)
			}
		},

		createImageBundle: function (imageBundle, callback) {
			adRepository.createImageBundle(imageBundle, callback)
		},

		updateAdByAdID: function (Ad, callback) {

			const errors = adValidator.getAdErrors(Ad)
			var errorsExist = helperFunctions.hasErrors(errors)

			if (errorsExist) {
				callback(errors, null)
			} else {
				adRepository.updateAdByAdID(Ad, callback)
			}
		},

		deleteAd: function (adID, callback) {
			adRepository.deleteAd(adID, callback)
		},

		getAllAdsBidsUsersByUserID: function (userID, callback) {
			adRepository.getAllAdsBidsUsersByUserID(userID, callback)
		},

		getAllBidsAndUserByAdID: function (adID, callback) {
			adRepository.getAllBidsAndUserByAdID(adID, callback)
		},

		closeAd: function (adID, callback) {
			adRepository.closeAd(adID, callback)
		},

		isCorrectToken: function(accessToken,callback){
			helperFunctions.isCorrectToken(accessToken,callback)		
		},

		userHasAccess: function(adID, storedID, callback){
			adRepository.getAdByAdID(adID, function (errors, Ad) {
				if (errors.length !== 0) {
					callback(errors, [])
				} else {
					var isAuthenticated = helperFunctions.userHasAccess(Ad.userID, storedID)
					callback([], isAuthenticated)
				}
			})		
		},

		userIsLoggedIn: function(session){
			var userIsLoggedIn = helperFunctions.userIsLoggedIn(session)
			return userIsLoggedIn
		}

	}
}