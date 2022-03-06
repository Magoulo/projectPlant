const bidRepository = require('../data-access-layer/bid-repository')



module.exports = function ({ bidRepository }) {
	return{

		getAllBidsByAdID: function (adID, callback) {
			bidRepository.getAllBidsByAdID(adID, callback)
		},
	
		getBidByAdID: function (adID, callback) {
			bidRepository.getBidByAdID(adID, callback)
		},
	
		getAllBidsByUserID: function (userID, callback) {
			bidRepository.getAllBidsByUserID(userID, callback)
		},
	
		createBid: function (Bid, callback) {
			bidRepository.createBid(Bid, callback)
		},
	
		deleteBid: function (bidID, callback) {
			bidRepository.deleteBid(bidID, callback)
		},
	
		updateBidByBidID: function (bid, callback) {
			bidRepository.updateBidByBidID(bid, callback)
		},
	
		setAllBidsToDeclined: function (adID, callback) {
			bidRepository.setAllBidsToDeclined(adID, callback)
		}

	}
}