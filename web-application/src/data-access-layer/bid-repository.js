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
	const query = "SELECT Bid.bidID, Bid.userID, Bid.adID, Bid.message, Bid.date, Bid.imagePath, Ad.title, Ad.latinName, Ad.description, ImageBundle.coverImagePath, ImageBundle.firstImagePath, ImageBundle.secondImagePath FROM Bid JOIN Ad ON Bid.adID = Ad.adID JOIN ImageBundle ON Ad.adID = ImageBundle.adID WHERE Bid.userID = ? ORDER BY Bid.bidID DESC"
	const values = [userID]

	db.query(query, values, function (error, Bid) {
		if (error) {
			callback(['databaseError in Bid table'], null)
		} else {
			callback([], Bid)
		}
	})
}

// ---------------- CREATE BID -----------------------------------------------
exports.createBid = function (Ad, callback) {

	const status = "Pending"
	const date = new Date().toISOString().slice(0, 19).replace('T', ' ')
	const query = `INSERT INTO Bid (userID, adID, date, imagePath, message, status) VALUES (?,?,?,?,?,?);`
	const values = [Ad.userID, Ad.adID, date, Ad.imagePath, Ad.message, status]

	console.log(date);

	db.query(query, values, function (error) {
		if (error) {
			callback(['databaseError'], null)
		} else {
			callback(error)
		}
	})
}


// ---------------- UPDATE BID -----------------------------------------------

exports.updateBidByBidID = function (bid, callback) {
	const query = "UPDATE Bid SET status = ? WHERE BidID = ?"
	const values = [bid.status, bid.bidID]

	db.query(query, values, function (error) {
		if (error) {
			callback(['databaseError'], null)
		} else {
			console.log("sucessfully update")
			callback(error)
		}
	})
}

exports.setAllBidsToDeclined = function(adID, callback){
	const status = "Declined"
	const query = "UPDATE Bid SET status = ? WHERE adID = ?"
	const values = [status, adID]

	db.query(query, values, function (error) {
		if (error) {
			callback(['databaseError'], null)
		} else {
			console.log("sucessfully updated all other ads to declined")
			callback(error)
		}
	})
}
// ---------------- DELETE BID -----------------------------------------------