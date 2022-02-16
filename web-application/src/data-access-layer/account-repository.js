const db = require('./db')

/*
	Retrieves all accounts ordered by username.
	Possible errors: databaseError
	Success value: The fetched accounts in an array.
*/
exports.getAllAccounts = function(callback){
	
	const query = `SELECT * FROM UserAccounts ORDER BY username`
	const values = []
	
	db.query(query, values, function(error, UserAccounts){
		if(error){
			callback(['databaseError'], null)
		}else{
			callback([], UserAccounts)
		}
	})
	
}

/*
	Retrieves the account with the given username.
	Possible errors: databaseError
	Success value: The fetched account, or null if no account has that username.
*/
exports.getAccountByUsername = function(username, callback){
	
	const query = `SELECT * FROM UserAccounts WHERE username = ? LIMIT 1`
	const values = [username]
	
	db.query(query, values, function(error, UserAccounts){
		if(error){
			callback(['databaseError'], null)
		}else{
			console.log("-------------------------------inside query in account-repository-------------------------------")
			console.log("UserAccounts: ",UserAccounts)
			console.log("UserAccounts[0]: ",UserAccounts[0])
			console.log("UserAccounts.length: ", UserAccounts.length)
			console.log("------------------------------------------------------------------------------------------------")
			callback([], UserAccounts[0])
		}
	})
	
}

exports.getUserByID = function(userID,callback){
	const query = "SELECT * FROM Users WHERE userID = ? LIMIT 1"
	const values = [userID]
	console.log("-------------------------------inside getUserByID in account-repository-------------------------------")
	console.log("userID: ", userID)

	db.query(query, values, function(error, Users){
		if(error){
			callback(['databaseError in usertable'], null)
		}else{
			
			console.log("Users: ",Users)
			console.log("Users[0]: ",Users[0])
			console.log("Users.length: ", Users.length)
			console.log("------------------------------------------------------------------------------------------------")
			callback([], Users[0])
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
	
	const query = `INSERT INTO UserAccounts (username, passwordHash) VALUES (?, ?)`
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