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
			callback([], UserAccount[0])
		}
	})
	
}

exports.getUserByID = function(userAccountID,callback){
	const query = "SELECT * FROM User WHERE userAccountID = ? LIMIT 1"
	const values = [userAccountID]

	db.query(query, values, function(error, User){
		if(error){
			callback(['databaseError in user table'], null)
		}else{
			callback([], User[0])
		}
	})
}

exports.getAdByUserID = function(userID,callback){
	const query = "SELECT * FROM Ad WHERE userID = ? LIMIT 1"
	const values = [userID]

	db.query(query, values, function(error, Ad){
		if(error){
			callback(['databaseError in Ads table'], null)
		}else{
			callback([], Ad[0])
		}
	})
}

exports.getImageBundleByAdID = function(adID,callback){
	const query = "SELECT * FROM ImageBundle WHERE adID = ? LIMIT 1"
	const values = [adID]

	db.query(query, values, function(error, ImageBundle){
		if(error){
			callback(['databaseError in ImageBundle table'], null)
		}else{
			
			callback([], ImageBundle[0])
		}
	})
}

exports.getBidByAdID = function(adID, callback){
	const query = "SELECT * FROM Bid WHERE adID = ? LIMIT 1"
	const values = [adID]


	db.query(query, values, function(error, Bid){
		if(error){
			callback(['databaseError in Bid table'], null)
		}else{
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