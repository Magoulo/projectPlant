const adRepository = require('../data-access-layer/ad-repository')


exports.getAllAds = function (callback) {
	adRepository.getAllAds(callback)
}

exports.getAdByAdID = function (adID, callback) {
	adRepository.getAdByAdID(adID, callback)
}

exports.getAllAdsByUserID = function (userID, callback) {
	adRepository.getAllAdsByUserID(userID, callback)
}

exports.getAdByUserID = function (userID, callback) {
	adRepository.getAdByUserID(userID, callback)
}

exports.getImageBundleByAdID = function (adID, callback) {
	adRepository.getImageBundleByAdID(adID, callback)
}

exports.getAllAdsByTitleOrLatinName = function(title, callback){
	adRepository.getAllAdsByTitleOrLatinName(title, callback)

}

//-------------------------------Create Ad -------------------------------
exports.createAd = function(ad, callback){
	adRepository.createAd(ad,callback)
}
// Create imageBundle
exports.createImageBundle = function(imageBundle, callback){
	adRepository.createImageBundle(imageBundle, callback)
}

//----------------------------- Update Ad -------------------------------
exports.updateAdByAdID = function (adID, title, latinName, description, callback) {
	adRepository.updateAdByAdID(adID, title, latinName, description, callback)
}

//----------------------------- Delete Ad -------------------------------
exports.deleteAd = function(adID, callback){
	adRepository.deleteAd(adID, callback)
}

//vart?? 
exports.getAllAdsBidsUsersByUserID = function (userID, callback) {
	adRepository.getAllAdsBidsUsersByUserID(userID, callback)
}

exports.getAllBidsAndUserByAdID = function(adID,callback){
	adRepository.getAllBidsAndUserByAdID(adID, callback)
}

// Closeing Ad
exports.closeAd = function(adID, callback){
	adRepository.closeAd(adID,callback)
}