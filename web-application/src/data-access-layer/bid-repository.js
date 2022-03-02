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
	const query = "SELECT Bid.bidID, Bid.userID, Bid.adID, Bid.message, Bid.date, Bid.imagePath, Ad.title, Ad.latinName, Ad.description, ImageBundle.coverImagePath, ImageBundle.firstImagePath, ImageBundle.secondImagePath FROM Bid JOIN Ad ON Bid.adID = Ad.adID JOIN ImageBundle ON Ad.adID = ImageBundle.adID WHERE Bid.userID = ?"
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

	const year = new Date()
	year.getFullYear()
	const month = new Date()
	month.getMonth()
	const day = new Date()
	day.getDate()  //'%${searchInput}%'
	const status = "pending"

	//console.log(`${year}-${month}-${day}`);
	const date = "2022-02-16" //`${year}-${month}-${day}`

	const query = `INSERT INTO Bid (userID, adID, date, imagePath, message, status) VALUES (?,?,?,?,?,?);`
	const values = [Ad.userID, Ad.adID, date, Ad.imagePath, Ad.message, status]

	db.query(query, values, function (error, Bid) {
		if (error) {
			console.log("DB error: ", error)
			callback(['databaseError'], null)
		} else {
			console.log("-----------------------------------------------------", Bid.bidID)
			callback(error)
		}
	})
}


// ---------------- UPDATE BID -----------------------------------------------

// ---------------- DELETE BID -----------------------------------------------