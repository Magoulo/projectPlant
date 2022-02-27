const db = require('./db')

// ------------------ GET AD/S -------------------------------------------------------------------------
exports.getAllAds = function (callback) {

	const query = `SELECT * FROM Ad JOIN ImageBundle ON Ad.adID = ImageBundle.adID ORDER BY Ad.adID`
	const values = []

	db.query(query, values, function (error, Ad) {
		if (error) {
			callback(['databaseError in getAllAds'], null)
		} else {
			callback([], Ad)
		}
	})
}

exports.getAdByAdID = function (adID, callback) {

	const query = "SELECT * FROM Ad JOIN ImageBundle ON Ad.adID = ImageBundle.adID WHERE Ad.adID = ? LIMIT 1"
	const values = [adID]

	db.query(query, values, function (error, Ad) {
		if (error) {
			callback(['databaseError in Ads table'], null)
		} else {
			callback([], Ad[0])
		}
	})
}

exports.getAllAdsByUserID = function (userID, callback) {

	const query = `SELECT * FROM Ad JOIN ImageBundle ON Ad.adID = ImageBundle.adID WHERE Ad.userID = ? ORDER BY Ad.adID`
	const values = [userID]

	db.query(query, values, function (error, Ad) {
		if (error) {
			callback(['databaseError in getAllAdsByUserID'], null)
		} else {
			callback([], Ad)
		}
	})
}

exports.getAdByUserID = function (userID, callback) {

	const query = "SELECT * FROM Ad WHERE userID = ? LIMIT 1"
	const values = [userID]

	db.query(query, values, function (error, Ad) {
		if (error) {
			callback(['databaseError in Ads table'], null)
		} else {
			callback([], Ad[0])
		}
	})
}

// Ad's Image Bundle
exports.getImageBundleByAdID = function (adID, callback) {
	const query = "SELECT * FROM ImageBundle WHERE adID = ? LIMIT 1"
	const values = [adID]

	db.query(query, values, function (error, ImageBundle) {
		if (error) {
			callback(['databaseError in Bid table'], null)
		} else {
			callback([], ImageBundle[0])
		}
	})
}

//Create Ad
exports.createAd = function(ad, callback){
	const query = "INSERT INTO Ad (userID, title, latinName, description, isClosed) VALUES (?,?,?,?,?)"
	const values = [3, ad.title, ad.latinName, ad.description, ad.isClosed]
	console.log("ad.userID, ad.title, ad.latinName, ad.description, ad.isClosed: ", ad.userID, ad.title, ad.latinName, ad.description, ad.isClosed)

	db.query(query, values, function(error, adID){
		if(error){
			console.log("DB error: ", error)
			callback(['databaseError'], null)
		} else {
				console.log("this.lastID", adID.insertId)
			callback(error, adID.insertId)
		}
	})
}

//Update Ad
exports.updateAdByAdID = function (adID, title, latinName, description, callback) {
	const query = "UPDATE Ad SET title = ?, latinName = ?, description = ? WHERE userID = ?"
	const values = [title, latinName, description, adID]

	db.query(query, values, function (error) {
		callback(error)
	})
}

//Delte Ad
exports.deleteAd = function(adID, callback){
	const query = "DELETE FROM Ad WHERE adID = ?"
	const values = [adID]

	db.query(query, values, function(error){
		if(error){
			console.log("error: ", error)
			 callback(["Database error"], null)
		} else {
			callback([])
		}
	})
}

//------------------- Get All --------------------------- vart??
exports.getAllAdsBidsUsersByUserID = function (userID, callback) {
	const query = `SELECT * FROM Ad JOIN ImageBundle ON Ad.adID = ImageBundle.adID JOIN Bid ON Ad.adID = Bid.adID JOIN User ON Bid.userID = User.userID WHERE Ad.userID = ? ORDER BY Ad.userID`
	const values = [userID]

	db.query(query, values, function (error, Ad) {
		if (error) {
			callback(['databaseError in getAllAdsByUserID'], null)
		} else {
			callback([], Ad)
		}
	})
}


exports.getAllAdsByTitleOrLatinName = function (searchInput, callback) {
	const query = `SELECT * FROM Ad JOIN ImageBundle ON Ad.adID = ImageBundle.adID WHERE title LIKE '%${searchInput}%' OR latinName LIKE '%${searchInput}%'`

	db.query(query, function (error, Ad) {
		if (error) {
			callback(['databaseError in getAllAdsByTitle'], null)
		} else {
			callback([], Ad)
		}
	})
}
