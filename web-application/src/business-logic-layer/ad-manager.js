const adRepository = require('../data-access-layer/ad-repository')



module.exports = function ({ adRepository, adValidator }) {
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

		createAd: function (Ad, callback) { // -----------------------

			const errors = adValidator.getAdErrors(Ad)
			var errorsExist = false

			for (let i = 0; i < errors.length; i++) {
				if (0 < errors[i].length) {
					errorsExist = true
				}
			}

			if (errorsExist) {
				callback(errors, null)
			} else {
				adRepository.createAd(Ad, callback)
			}
		},


		createImageBundle: function (imageBundle, callback) {
			adRepository.createImageBundle(imageBundle, callback)
		},

		
		updateAdByAdID: function (adID, title, latinName, description, callback) {

			const errors = adValidator.getAdErrors(Ad)
			var errorsExist = false

			for (let i = 0; i < errors.length; i++) {
				if (0 < errors[i].length) {
					errorsExist = true
				}
			}

			if (errorsExist) {
				callback(errors, null)
			} else {
				adRepository.updateAdByAdID(adID, title, latinName, description, callback)
			}
		},

		deleteAd: function (adID, callback) {
			adRepository.deleteAd(adID, callback)
		},

		//vart?? 
		getAllAdsBidsUsersByUserID: function (userID, callback) {
			adRepository.getAllAdsBidsUsersByUserID(userID, callback)
		},

		getAllBidsAndUserByAdID: function (adID, callback) {
			adRepository.getAllBidsAndUserByAdID(adID, callback)
		},

		closeAd: function (adID, callback) {
			adRepository.closeAd(adID, callback)
		}

	}
}