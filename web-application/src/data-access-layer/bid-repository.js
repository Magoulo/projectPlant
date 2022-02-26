const db = require('./db')

// ---------------- GET BID/S -----------------------------------------------

exports.getAllBidsByAdID = function (adID, callback) {
	const query = "SELECT * FROM Bid WHERE adID = ?"
	const values = [adID]

	db.query(query, values, function (error, Bid) {
		if (error) {
			callback(['databaseError in Bid table'], null)
		} else {
			callback([], Bid)
		}
	})
}

exports.getBidByAdID = function (adID, callback) {
	const query = "SELECT * FROM Bid WHERE adID = ? LIMIT 1"
	const values = [adID]

	db.query(query, values, function (error, Bid) {
		if (error) {
			callback(['databaseError in Bid table'], null)
		} else {
			callback([], Bid[0])
		}
	})
}

exports.getAllBidsByUserID = function (userID, callback) {
	const query = "SELECT Bid.userID, Bid.adID, Bid.message, Bid.date, Bid.imagePath, Ad.title, Ad.latinName, Ad.description, ImageBundle.coverImagePath, ImageBundle.firstImagePath, ImageBundle.secondImagePath FROM Bid JOIN Ad ON Bid.adID = Ad.adID JOIN ImageBundle ON Ad.adID = ImageBundle.adID WHERE Bid.userID = ?"
	const values = [userID]

	db.query(query, values, function (error, Bid) {
		if (error) {
			callback(['databaseError in Bid table'], null)
		} else {
			callback([], Bid)
		}
	})
}


// ---------------- UPDATE BID -----------------------------------------------

// ---------------- DELETE BID -----------------------------------------------