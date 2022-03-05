const bidRepository = require('../data-access-layer/bid-repository')


exports.getAllBidsByAdID = function (adID, callback) {
	bidRepository.getAllBidsByAdID(adID, callback)
}

exports.getBidByAdID = function (adID, callback) {
	bidRepository.getBidByAdID(adID, callback)
}

exports.getAllBidsByUserID = function (userID, callback) {
	bidRepository.getAllBidsByUserID(userID, callback)
}

exports.createBid = function (Bid, callback) {
	bidRepository.createBid(Bid, callback)
}

exports.updateBidByBidID = function (bid, callback){
	bidRepository.updateBidByBidID(bid, callback)
}

exports.setAllBidsToDeclined = function(adID, callback){
	bidRepository.setAllBidsToDeclined(adID, callback)
}