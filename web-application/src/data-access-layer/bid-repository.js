const db = require('./db')

module.exports = function () {
	return {

		getAllBidsByAdID: function (adID, callback) {

			const query = "SELECT * FROM Bid WHERE adID = ?"
			const values = [adID]

			db.query(query, values, function (error, Bids) {
				if (error) {
					callback(['databaseError'], null)
				} else {
					callback([], Bids)
				}
			})
		},

		getBidByAdID: function (adID, callback) {

			const query = "SELECT * FROM Bid WHERE adID = ? LIMIT 1"
			const values = [adID]

			db.query(query, values, function (error, Bids) {
				if (error) {
					callback(['databaseError'], null)
				} else {
					callback([], Bids[0])
				}
			})
		},

		getAllBidsByUserID: function (userID, callback) {

			const query = "SELECT Bid.bidID, Bid.userID, Bid.adID, Bid.message, Bid.datePosted, Bid.imagePath, Bid.status, Ad.title, Ad.latinName, ImageBundle.coverImageName FROM Bid JOIN Ad ON Bid.adID = Ad.adID JOIN ImageBundle ON Ad.adID = ImageBundle.adID WHERE Bid.userID = ? ORDER BY Bid.bidID DESC"
			const values = [userID]

			db.query(query, values, function (error, Bids) {
				if (error) {
					callback(['databaseError'], null)
				} else {
					callback([], Bids)
				}
			})
		},

		createBid: function (Bid, callback) {

			const status = "Pending"
			const date = new Date().toISOString().slice(0, 19).replace('T', ' ')
			const query = `INSERT INTO Bid (userID, adID, datePosted, imagePath, message, status) VALUES (?,?,?,?,?,?);`
			const values = [Bid.userID, Bid.adID, date, Bid.imagePath, Bid.message, status]

			db.query(query, values, function (error) {
				if (error) {
					callback(['databaseError'])
				} else {
					callback([])
				}
			})
		},

		deleteBid: function (bidID, callback) {

			const query = `DELETE FROM Bid WHERE Bid.bidID = ?`
			const values = [bidID]

			db.query(query, values, function (error) {
				if (error) {
					callback(['databaseError'])
				} else {
					callback([])
				}
			})
		},

		updateBidByBidID: function (bid, callback) {

			const query = "UPDATE Bid SET status = ? WHERE BidID = ?"
			const values = [bid.status, bid.bidID]

			db.query(query, values, function (error) {
				if (error) {
					callback(['databaseError'])
				} else {
					callback([])
				}
			})
		},

		setAllBidsToDeclined: function (adID, callback) {

			const status = "Declined"
			const query = "UPDATE Bid SET status = ? WHERE adID = ?"
			const values = [status, adID]

			db.query(query, values, function (error) {
				if (error) {
					callback(['databaseError'])
				} else {
					callback([])
				}
			})
		}

	}
}