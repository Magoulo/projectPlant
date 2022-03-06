const adRepository = require('../data-access-layer/ad-repository')



module.exports = function ({ adRepository}) {
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

		createAd: function (ad, callback) {
			adRepository.createAd(ad, callback)
		},

		createImageBundle: function (imageBundle, callback) {
			adRepository.createImageBundle(imageBundle, callback)
		},
	
		updateAdByAdID: function (adID, title, latinName, description, callback) {
			adRepository.updateAdByAdID(adID, title, latinName, description, callback)
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