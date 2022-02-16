const db = require('./db')

/*
	Retrieves all accounts ordered by username.
	Possible errors: databaseError
	Success value: The fetched accounts in an array.
*/
exports.getAllAccounts = function(callback){
	
	const query = `SELECT * FROM UserAccount ORDER BY username`
	const values = []
	
	db.query(query, values, function(error, UserAccount){
		if(error){
			callback(['databaseError'], null)
		}else{
			callback([], UserAccount)
		}
	})
	
}

/*
	Retrieves the account with the given username.
	Possible errors: databaseError
	Success value: The fetched account, or null if no account has that username.
*/
exports.getAccountByUsername = function(username, callback){
	
	const query = `SELECT * FROM UserAccount WHERE username = ? LIMIT 1`
	const values = [username]
	
	db.query(query, values, function(error, UserAccount){
		if(error){
			callback(['databaseError'], null)
		}else{
			console.log("-------------------------------inside query in account-repository-------------------------------")
			console.log("UserAccount: ",UserAccount)
			console.log("UserAccount[0]: ",UserAccount[0])
			console.log("UserAccount.length: ", UserAccount.length)
			console.log("------------------------------------------------------------------------------------------------")
			callback([], UserAccount[0])
		}
	})
	
}

exports.getUserByID = function(userAccountID,callback){
	const query = "SELECT * FROM User WHERE userAccountID = ? LIMIT 1"
	const values = [userAccountID]
	console.log("-------------------------------inside getUserByID in account-repository-------------------------------")
	console.log("userAccountID: ", userAccountID)

	db.query(query, values, function(error, User){
		if(error){
			callback(['databaseError in user table'], null)
		}else{
			
			console.log("User: ",User)
			console.log("User[0]: ",User[0])
			console.log("User.length: ", User.length)
			console.log("------------------------------------------------------------------------------------------------")
			callback([], User[0])
		}
	})
}

exports.getAdByUserID = function(userID,callback){
	const query = "SELECT * FROM Ad WHERE userID = ? LIMIT 1"
	const values = [userID]
	console.log("-------------------------------inside geAdByUserID in account-repository-------------------------------")
	console.log("userID: ", userID)

	db.query(query, values, function(error, Ad){
		if(error){
			callback(['databaseError in Ads table'], null)
		}else{
			
			console.log("Ad: ",Ad)
			console.log("Ad[0]: ",Ad[0])
			console.log("Ad.length: ", Ad.length)
			console.log("------------------------------------------------------------------------------------------------")
			callback([], Ad[0])
		}
	})
}

exports.getImageBundleByAdID = function(adID,callback){
	const query = "SELECT * FROM ImageBundle WHERE adID = ? LIMIT 1"
	const values = [adID]
	console.log("-------------------------------inside getImageBundleByAdID in account-repository-------------------------------")
	console.log("adID: ", adID)

	db.query(query, values, function(error, ImageBundle){
		if(error){
			callback(['databaseError in ImageBundle table'], null)
		}else{
			
			console.log("ImageBundle: ",ImageBundle)
			console.log("ImageBundle[0]: ",ImageBundle[0])
			console.log("ImageBundle.length: ", ImageBundle.length)
			console.log("------------------------------------------------------------------------------------------------")
			callback([], ImageBundle[0])
		}
	})
}

exports.getBidByAdID = function(adID, callback){
	const query = "SELECT * FROM Bid WHERE adID = ? LIMIT 1"
	const values = [adID]
	console.log("-------------------------------inside getBidByAdID in account-repository-------------------------------")
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

/*
	Creates a new account.
	account: {username: "The username", password: "The password"}
	Possible errors: databaseError, usernameTaken
	Success value: The id of the new account.
*/
exports.createAccount = function(account, callback){
	
	const query = `INSERT INTO UserAccount (username, passwordHash) VALUES (?, ?)`
	const values = [account.username, account.password]
	
	db.query(query, values, function(error, results){
		if(error){
			// TODO: Look for usernameUnique violation.
			callback(['databaseError'], null)
		}else{
			callback([], results.insertId)
		}
	})
	
}