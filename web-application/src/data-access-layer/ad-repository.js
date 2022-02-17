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
			
			console.log("Ad: ",Ad)
			console.log("Ad[0]: ",Ad[0])
			console.log("Ad.length: ", Ad.length)
			console.log("-----------22-------------------------------------------------------------------------------------")
			callback([], Ad[0])
		}
	})
}

exports.getAllBidsByAdID = function(adID, callback){
	const query = "SELECT * FROM Bid WHERE adID = ?"
	const values = [adID]
	console.log("-------------------------------inside getAllBidsByAdID in ad-repository-------------------------------")
	console.log("adID: ", adID)

	db.query(query, values, function(error, Bid){
		if(error){
			callback(['databaseError in Bid table'], null)
		}else{
			
			console.log("Bid: ",Bid)
			console.log("Bid[0]: ",Bid[0])
            console.log("Bid[1]: ",Bid[1])
			console.log("Bid.length: ", Bid.length)
			console.log("------------------------------------------------------------------------------------------------")
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
			
			console.log("Bid: ",Bid)
			console.log("Bid[0]: ",Bid[0])
			console.log("Bid.length: ", Bid.length)
			console.log("------------------------------------------------------------------------------------------------")
			callback([], Bid[0])
		}
	})
}

exports.getImageBundleByAdID = function(adID, callback){
	const query = "SELECT * FROM ImageBundle WHERE adID = ? LIMIT 1"
	const values = [adID]
	console.log("-------------------------------inside getImageBundleByAdID in ad-repository-------------------------------")
	console.log("adID: ", adID)

	db.query(query, values, function(error, ImageBundle){
		if(error){
			callback(['databaseError in Bid table'], null)
		}else{
			
			console.log("ImageBundle: ",ImageBundle)
			console.log("ImageBundle[0]: ",ImageBundle[0])
			console.log("ImageBundle.length: ", ImageBundle.length)
			console.log("------------------------------------------------------------------------------------------------")
			callback([], ImageBundle[0])
		}
	})
}