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

exports.getImageBundleByAdID = function (adID, callback){
	adRepository.getImageBundleByAdID(adID,callback)
}

exports.getUserByUserID = function(userID, callback){
	adRepository.getUserByUserID(userID, callback)
}

//vart?? 
exports.getAllAdsBidsUsersByUserID = function(userID, callback){
	adRepository.getAllAdsBidsUsersByUserID(userID,callback)
} 

//-------------------------------Update Ad -------------------------------
exports.updateAdByAdID = function (adID, title, latinName, description, callback) {
	adRepository.updateAdByAdID(adID, title, latinName, description, callback)
}