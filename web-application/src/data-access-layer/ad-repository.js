const db = require('./db')

exports.getAllAds = function(callback){
	
	const query = `SELECT * FROM Ad ORDER BY adID`
	const values = []
	
	db.query(query, values, function(error, Ad){
		if(error){
			callback(['databaseError'], null)
		}else{
			callback([], Ad)
		}
	})
	
}

exports.getAdByAdID = function(adID,callback){
	const query = "SELECT * FROM Ad WHERE adID = ? LIMIT 1"
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