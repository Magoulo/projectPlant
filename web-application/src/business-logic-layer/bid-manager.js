module.exports = function ({ bidRepository, bidValidator, helperFunctions }) {
	return {

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
			const error = bidValidator.getPlaceBidErrors(Bid)

			if (error.length) {

				callback(error, null)
			} else {
				bidRepository.createBid(Bid, callback)
			}
		},

		deleteBid: function (bidID, callback) {
			bidRepository.deleteBid(bidID, callback)
		},

		updateBidByBidID: function (bid, callback) {
			bidRepository.updateBidByBidID(bid, callback)
		},

		setAllBidsToDeclined: function (adID, callback) {
			bidRepository.setAllBidsToDeclined(adID, callback)
		},

		userHasAccess: function(bidID, storedID, callback){
			bidRepository.getBidByBidID(bidID, function (errors, Bid) {
				if (errors.length !== 0) {
					callback(errors, [])
				} else {
					var isAuthenticated = helperFunctions.userHasAccess(Bid.userID, storedID)
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