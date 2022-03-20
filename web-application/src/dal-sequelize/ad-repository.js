const { models } = require('./dbSequelize')

module.exports = function ({ }) {
	return {

		getAllAds: function (callback) {

			models.Ad.findAll({
				raw: true,
				nest: true,
				include: [{
					model: models.ImageBundle,
					required: true
				}],
			}).then((ad) => {
				callback([], ad)

			}).catch((error) => {
			})
		},

		/*getAllAds: function (callback) {

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
		},*/

		getAdByAdID: function (adID, callback) {

			models.Ad.findOne({
				raw: true,
				nest: true, //la till
				where: { id: adID },
				include: [{
					model: models.ImageBundle,
					required: true
				}],
			}).then((ad) => {
				console.log("---------", ad)
				callback([], ad)

			}).catch((error) => {
				console.log("error: ", error)
			})
		},

		/*	getAdByAdID: function (adID, callback) {
	
				const query = "SELECT * FROM Ad JOIN ImageBundle ON Ad.adID = ImageBundle.adID WHERE Ad.adID = ? LIMIT 1"
				const values = [adID]
	
				db.query(query, values, function (error, Ad) {
					if (error) {
						callback(['databaseError in Ads table'], null)
					} else {
						callback([], Ad[0])
					}
				})
			},*/

		getAllAdsByUserID: function (userID, callback) {
			console.log("getAllAdsByUserID ----------------------------------------------") // måste kolla så att denna funktion returnerar rätt imagebundle till rätt ad!
			//	console.log("models.Ad", models.Ad.findAll( {	where: { userID: 1 }}))

			models.Ad.findAll({
				raw: true,
				where: { userID: userID },
				include: [{
					model: models.ImageBundle,

					required: true

				}],
			}).then((ad) => {
				console.log("ads-------------------------------------: ", ad)
				callback([], ad)

			}).catch((error) => {
				console.log("error----------------------------------: ", error)
			})
		},

		/*getAllAdsByUserID: function (userID, callback) {

			const query = `SELECT * FROM Ad JOIN ImageBundle ON Ad.adID = ImageBundle.adID WHERE Ad.userID = ? ORDER BY Ad.adID`
			const values = [userID]

			db.query(query, values, function (error, Ad) {
				if (error) {
					callback(['databaseError in getAllAdsByUserID'], null)
				} else {
					callback([], Ad)
				}
			})
		},*/


		getAdByUserID: function (userID, callback) {

			models.Ad.findOne({
				where: { userID: userID }

			}).then((ad) => {
				console.log("Ad found by userID: ", ad)
				callback([], ad.dataValues)

			}).catch((error) => {
				console.log("error: ", error)
			})

		},

		/*getAdByUserID: function (userID, callback) {

			const query = "SELECT * FROM Ad WHERE userID = ? LIMIT 1"
			const values = [userID]

			db.query(query, values, function (error, Ad) {
				if (error) {
					callback(['databaseError in Ads table'], null)
				} else {
					callback([], Ad[0])
				}
			})
		}, */

		getImageBundleByAdID: function (adID, callback) {

			models.ImageBundle.findOne({
				where: { adID: adID }

			}).then((imageBundle) => {
				console.log("Gotten imageBundle: ", imageBundle)
				callback(imageBundle.dataValues)

			}).catch((error) => {
				console.log("error: ", error)
			})
		},

		/*getImageBundleByAdID: function (adID, callback) {

			const query = "SELECT * FROM ImageBundle WHERE adID = ? LIMIT 1"
			const values = [adID]

			db.query(query, values, function (error, ImageBundle) {
				if (error) {
					callback(['databaseError in Bid table'], null)
				} else {
					callback([], ImageBundle[0])
				}
			})
		},*/

		createImageBundle: function (imageBundle, callback) {

			models.ImageBundle.create({
				coverImagePath: imageBundle.coverImagePath,
				firstImagePath: imageBundle.firstImagePath,
				secondImagePath: imageBundle.secondImagePath,
				adID: imageBundle.adID

			}).then((imageBundle) => {
				console.log("Created imageBundle: ", imageBundle)
				callback([],imageBundle.dataValues)

			}).catch((error) => {
				console.log("error: ", error)
			
			})

		},

		/*createImageBundle: function (imageBundle, callback) {

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
		},*/

		createAd: function (ad, callback) {

			models.Ad.create({
				title: ad.title,
				latinName: ad.latinName,
				description: ad.description,
				isClosed: ad.isClosed,
				userID: ad.userID

			}).then((ad) => {
				console.log("Created ad: ", ad.dataValues)
				callback([], ad.dataValues)

			}).catch((error) => {
				console.log("error: ", error)
			})
		},

		/*createAd: function (ad, callback) {

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
		},*/

		updateAdByAdID: function (Ad, callback) {

			models.Ad.update({
				title: Ad.title,
				latinName: Ad.latinName,
				description: Ad.description,
			},
				{
					where: { id: Ad.id }

				}).then((Ad) => {
					console.log("Updated ad: ", Ad)
					callback([], Ad.dataValues)

				}).catch((error) => {
					console.log("error: ", error)
				})
		},

		/*updateAdByAdID: function (adID, title, latinName, description, callback) {

			const query = "UPDATE Ad SET title = ?, latinName = ?, description = ? WHERE adID = ?"
			const values = [title, latinName, description, adID]

			db.query(query, values, function (error) {
				callback(error)
			})
		},*/

		deleteAd: function (adID, callback) {

			models.Ad.destroy({

				where: { id: adID }

			}).then(function (rowDeleted) { // rowDeleted will return number of rows deleted
				if (rowDeleted === 1) {
					console.log('Deleted successfully')
					callback([])
				}
			}, function (err) {
				console.log(err);
			});

		},

		/*deleteAd: function (adID, callback) {

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
		},*/

		closeAd: function (adID, callback) {
			var closed = 1

			models.Ad.update({
				isClosed: closed,

			},
				{
					where: { id: adID }

				}).then((ad) => {
					console.log("Closed ad: ", ad)
					callback([], ad.dataValues)

				}).catch((error) => {
					console.log("error: ", error)
				})


		},
		/*closeAd: function (adID, callback) {

			const isClosed = 1
			const query = "UPDATE Ad SET isClosed = ? WHERE adID = ?"
			const values = [isClosed, adID]

			db.query(query, values, function (error) {
				callback(error)
			})
		},*/

		getAllAdsBidsUsersByUserID: function (userID, callback) {

			models.Ad.findAll({
				raw: true,
				nest: true,
				where: { userID: userID },
	
				include: [{
					model: models.ImageBundle,
					required: true,},
					{
					model: models.Bid,
					required: true,

					include: [{
						model: models.User,
						required: true,
					}]
				}],

			}).then((ad) => {
				console.log("ads, imageBundle, bids and user: ", ad)
				callback([], ad)
			}).catch((error) => {
				console.log("error: ", error)
			})
		},

		/*getAllAdsBidsUsersByUserID: function (userID, callback) {

			const query = `SELECT * FROM Ad JOIN ImageBundle ON Ad.adID = ImageBundle.adID JOIN Bid ON Ad.adID = Bid.adID JOIN User ON Bid.userID = User.userID WHERE Ad.userID = ? ORDER BY Ad.userID`
			const values = [userID]

			db.query(query, values, function (error, Ad) {
				if (error) {
					callback(['databaseError in getAllAdsByUserID'], null)
				} else {
					callback([], Ad)
				}
			})
		},*/

		getAllBidsAndUserByAdID: function (adID, callback) { // should be in Bid repo

			models.Bid.findAll({
				where: { adID: adID },

				include: [{
					model: models.User,
					required: true,

					where: { userID: bid.userID }
				}],

			}).then((bid) => {
				console.log("bids: ", bid)
				callback(bid.dataValues)

			}).catch((error) => {
				console.log("error: ", error)
			})
		},

		/*getAllBidsAndUserByAdID: function (adID, callback) {

			const query = "SELECT * FROM Bid JOIN User ON Bid.userID = User.userID WHERE Bid.adID = ?"
			const values = [adID]

			db.query(query, values, function (error, adOffers) {
				if (error) {
					callback(['databaseError in getAllAdsByUserID'], null)
				} else {
					callback([], adOffers)
				}
			})
		},*/

		getAllAdsByTitleOrLatinName: function (searchInput, callback) {

			models.Ad.findAll({
				where: {
					title: { [Op.like]: '%$' + searchInput + '%' },

					$or: [{

						latinName: { [Op.like]: '%$' + searchInput + '%' }

					}]
				},

				include: [{
					model: models.ImageBundle,
					required: true

				}],

			}).then((ad) => {
				console.log("ads: ", ad)
				callback([], ad.dataValues)

			}).catch((error) => {
				console.log("error: ", error)
			})

		}

		/*getAllAdsByTitleOrLatinName: function (searchInput, callback) {

			const query = `SELECT * FROM Ad JOIN ImageBundle ON Ad.adID = ImageBundle.adID WHERE title LIKE '%${searchInput}%' OR latinName LIKE '%${searchInput}%'`

			db.query(query, function (error, Ad) {
				if (error) {
					callback(['databaseError in getAllAdsByTitle'], null)
				} else {
					callback([], Ad)
				}
			})
		}*/

	}
}