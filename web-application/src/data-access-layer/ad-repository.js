const db = require('./db')



module.exports = function ({ }) {
	return {

		getAllAds: function (callback) {

			const isClosed = 0
			const query = `SELECT * FROM Ad JOIN ImageBundle ON Ad.adID = ImageBundle.adID WHERE isClosed = ? ORDER BY Ad.adID`
			const values = [isClosed]

			db.query(query, values, function (error, Ad) {
				if (error) {
					callback(['databaseError in getAllAds'], null)
				} else {
					callback([], Ad)
				}
			})
		},

		getAdByAdID: function (adID, callback) {

			const query = "SELECT * FROM Ad JOIN ImageBundle ON Ad.adID = ImageBundle.adID WHERE Ad.adID = ? LIMIT 1"
			const values = [adID]

			db.query(query, values, function (error, Ad) {
				if (error) {
					callback(['databaseError in Ads table'], null)
				} else {
					callback([], Ad[0])
				}
			})
		},

		getAllAdsByUserID: function (userID, callback) {

			const query = `SELECT * FROM Ad JOIN ImageBundle ON Ad.adID = ImageBundle.adID WHERE Ad.userID = ? ORDER BY Ad.adID`
			const values = [userID]

			db.query(query, values, function (error, Ad) {
				if (error) {
					callback(['databaseError in getAllAdsByUserID'], null)
				} else {
					callback([], Ad)
				}
			})
		},

		getAdByUserID: function (userID, callback) {

			const query = "SELECT * FROM Ad WHERE userID = ? LIMIT 1"
			const values = [userID]

			db.query(query, values, function (error, Ad) {
				if (error) {
					callback(['databaseError in Ads table'], null)
				} else {
					callback([], Ad[0])
				}
			})
		},

		getImageBundleByAdID: function (adID, callback) {

			const query = "SELECT * FROM ImageBundle WHERE adID = ? LIMIT 1"
			const values = [adID]

			db.query(query, values, function (error, ImageBundle) {
				if (error) {
					callback(['databaseError in Bid table'], null)
				} else {
					callback([], ImageBundle[0])
				}
			})
		},

		createImageBundle: function (imageBundle, callback) {

			const query = "INSERT INTO ImageBundle (adID, coverImagePath, firstImagePath, secondImagePath) VALUES (?,?,?,?)"
			const values = [imageBundle.adID, imageBundle.coverImagePath, imageBundle.firstImagePath, imageBundle.secondImagePath]

			db.query(query, values, function (error, ibID) {
				if (error) {
					console.log("DB error: ", error)
					callback(['databaseError'], null)
				} else {
					console.log("this.lastID", ibID.insertId)
					callback(error, ibID.insertId)
				}
			})
		},

		createAd: function (ad, callback) {

			const query = "INSERT INTO Ad (userID, title, latinName, description, isClosed) VALUES (?,?,?,?,?)"
			const values = [ad.userID, ad.title, ad.latinName, ad.description, ad.isClosed]
			console.log("ad.userID, ad.title, ad.latinName, ad.description, ad.isClosed: ", ad.userID, ad.title, ad.latinName, ad.description, ad.isClosed)

			db.query(query, values, function (error, adID) {
				if (error) {
					console.log("DB error: ", error)
					callback(['databaseError'], null)
				} else {
					console.log("this.lastID", adID.insertId)
					callback(error, adID.insertId)
				}
			})
		},

		updateAdByAdID: function (Ad, callback) {

			console.log(Ad.title);

			const query = "UPDATE Ad SET title = ?, latinName = ?, description = ? WHERE adID = ?"
			const values = [Ad.title, Ad.latinName, Ad.description, Ad.adID]

			db.query(query, values, function (error) {
				callback(error)
			})
		},

		deleteAd: function (adID, callback) {
			
			const query = "DELETE FROM Ad WHERE adID = ?"
			const values = [adID]

			db.query(query, values, function (error) {
				if (error) {
					console.log("error: ", error)
					callback(["Database error"], null)
				} else {
					callback([])
				}
			})
		},

		closeAd: function (adID, callback) {

			const isClosed = 1
			const query = "UPDATE Ad SET isClosed = ? WHERE adID = ?"
			const values = [isClosed, adID]

			db.query(query, values, function (error) {
				callback(error)
			})
		},

		getAllAdsBidsUsersByUserID: function (userID, callback) {

			const query = `SELECT * FROM Ad JOIN ImageBundle ON Ad.adID = ImageBundle.adID JOIN Bid ON Ad.adID = Bid.adID JOIN User ON Bid.userID = User.userID WHERE Ad.userID = ? ORDER BY Ad.userID`
			const values = [userID]

			db.query(query, values, function (error, Ad) {
				if (error) {
					callback(['databaseError in getAllAdsByUserID'], null)
				} else {
					callback([], Ad)
				}
			})
		},

		getAllBidsAndUserByAdID: function (adID, callback) {
			
			const query = "SELECT * FROM Bid JOIN User ON Bid.userID = User.userID WHERE Bid.adID = ?"
			const values = [adID]

			db.query(query, values, function (error, adOffers) {
				if (error) {
					callback(['databaseError in getAllAdsByUserID'], null)
				} else {
					callback([], adOffers)
				}
			})
		},

		getAllAdsByTitleOrLatinName: function (searchInput, callback) {

			const query = `SELECT * FROM Ad JOIN ImageBundle ON Ad.adID = ImageBundle.adID WHERE title LIKE '%${searchInput}%' OR latinName LIKE '%${searchInput}%'`

			db.query(query, function (error, Ad) {
				if (error) {
					callback(['databaseError in getAllAdsByTitle'], null)
				} else {
					callback([], Ad)
				}
			})
		}

	}
}