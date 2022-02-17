const adRepository = require('../data-access-layer/ad-repository')

exports.getAllAds = function (callback) {
	adRepository.getAllAds(callback)
}

exports.getAllAdsByUserID = function(userID,callback){
	adRepository.getAllAdsByUserID(userID,callback)
}

exports.getAdByAdID = function (adID,callback) {
	adRepository.getAdByAdID(adID,callback)
}
exports.getAllBidsByAdID = function (adID, callback) {
	adRepository.getAllBidsByAdID(adID, callback)
}

exports.getBidByAdID = function (adID, callback) {
	adRepository.getBidByAdID(adID, callback)
}

exports.getImageBundleByAdID = function (adID, callback){
	adRepository.getImageBundleByAdID(adID,callback)
}