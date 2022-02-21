const db = require('./db')

exports.getAllAds = function(callback){
	
	const query = `SELECT * FROM Ad JOIN ImageBundle ON Ad.adID = ImageBundle.adID ORDER BY Ad.adID`
	const values = []
	
	db.query(query, values, function(error, Ad){
		console.log("Ad in getAll Ads: ", Ad)
		console.log("error in getAll Ads: ", error)
		if(error){
			callback(['databaseError in getAllAds'], null)
		}else{
			callback([], Ad)
		}
	})
}

exports.getAllAdsByUserID = function(userID,callback){
	const query = `SELECT * FROM Ad JOIN ImageBundle ON Ad.adID = ImageBundle.adID WHERE Ad.userID = ? ORDER BY Ad.adID`
	const values = [userID]
	
	db.query(query, values, function(error, Ad){
		if(error){
			callback(['databaseError in getAllAdsByUserID'], null)
		}else{
			callback([], Ad)
		}
	})
}

exports.getAdByAdID = function(adID,callback){
	const query = "SELECT * FROM Ad JOIN ImageBundle ON Ad.adID = ImageBundle.adID WHERE Ad.adID = ? LIMIT 1"
	const values = [adID]
	console.log("-------------------------------inside getAdByAdID in account-repository-------------------------------")
	console.log("adID: ", adID)

	db.query(query, values, function(error, Ad){
        console.log("Ad: ", Ad)
		if(error){
			callback(['databaseError in Ads table'], null)
		}else{
			callback([], Ad[0])
		}
	})
}

exports.getAllBidsByAdID = function(adID, callback){
	const query = "SELECT * FROM Bid WHERE adID = ?"
	const values = [adID]

	db.query(query, values, function(error, Bid){
		if(error){
			callback(['databaseError in Bid table'], null)
		}else{
			callback([], Bid)
		}
	})
}

exports.getBidByAdID = function(adID, callback){
	const query = "SELECT * FROM Bid WHERE adID = ? LIMIT 1"
	const values = [adID]
	console.log("-------------------------------inside getBidByAdID in ad-repository-------------------------------")
	console.log("adID: ", adID)

	db.query(query, values, function(error, Bid){
		if(error){
			callback(['databaseError in Bid table'], null)
		}else{
			callback([], Bid[0])
		}
	})
}

exports.getAllBidsByUserID = function(userID, callback){
	const query = "SELECT Bid.userID, Bid.adID, Bid.message, Bid.date, Bid.imagePath, Ad.title, Ad.latinName, Ad.description, ImageBundle.coverImagePath, ImageBundle.firstImagePath, ImageBundle.secondImagePath FROM Bid JOIN Ad ON Bid.adID = Ad.adID JOIN ImageBundle ON Ad.adID = ImageBundle.adID WHERE Bid.userID = ?"
	const values = [userID]

	db.query(query, values, function(error, Bid){
		if(error){
			callback(['databaseError in Bid table'], null)
		}else{
			callback([], Bid)
		}
	})
}

exports.getImageBundleByAdID = function(adID, callback){
	const query = "SELECT * FROM ImageBundle WHERE adID = ? LIMIT 1"
	const values = [adID]

	db.query(query, values, function(error, ImageBundle){
		if(error){
			callback(['databaseError in Bid table'], null)
		}else{
			callback([], ImageBundle[0])
		}
	})
}

exports.getUserByUserID = function(userID, callback){
	const query = "SELECT * FROM User WHERE userID = ? LIMIT 1"
	const values = [userID]

	db.query(query, values, function(error, User){
		if(error){
			callback(['databaseError in User table'], null)
		}else{
			callback([], User[0])
		}
	})
}

exports.getAllAdsBidsUsersByUserID = function(userID,callback){
	const query = `SELECT * FROM Ad JOIN ImageBundle ON Ad.adID = ImageBundle.adID JOIN Bid ON Ad.adID = Bid.adID JOIN User ON Bid.userID = User.userID WHERE Ad.userID = ? ORDER BY Ad.userID`
	const values = [userID]
	
	db.query(query, values, function(error, Ad){
		if(error){
			callback(['databaseError in getAllAdsByUserID'], null)
		}else{
			callback([], Ad)
		}
	})
}