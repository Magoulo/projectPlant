const db = require('./db')


// -------------------- GET ACCOUNT/S ------------------------------------------------

/*
	Retrieves all accounts ordered by username.
	Possible errors: databaseError
	Success value: The fetched accounts in an array.
*/
exports.getAllAccounts = function (callback) {

	const query = `SELECT * FROM UserAccount ORDER BY username`
	const values = []

	db.query(query, values, function (error, UserAccount) {
		if (error) {
			callback(['databaseError'], null)
		} else {
			callback([], UserAccount)
		}
	})
}

/*
	Retrieves the account with the given username.
	Possible errors: databaseError
	Success value: The fetched account, or null if no account has that username.
*/
exports.getAccountByUsername = function (username, callback) {

	const query = `SELECT * FROM UserAccount WHERE username = ? LIMIT 1`
	const values = [username]

	db.query(query, values, function (error, UserAccount) {
		if (error) {
			callback(['databaseError'], null)
		} else {
			callback([], UserAccount[0])
		}
	})
}


// -------------------- CREATE ACCOUNT ---------------------------------------------
/*
	Creates a new account.
	account: {username: "The username", password: "The password"}
	Possible errors: databaseError, usernameTaken
	Success value: The id of the new account.
*/
exports.createAccount = function (account, callback) {

	const query = `INSERT INTO UserAccount (username, passwordHash) VALUES (?, ?)`
	const values = [account.username, account.passwordHash]

	db.query(query, values, function (error, userAccountID) {
		if (error) {
			// TODO: Look for usernameUnique violation.
			callback(['databaseError'], null)
		} else {
				console.log("this.lastID", userAccountID.insertId)
			callback(error, userAccountID.insertId)
		}
	})

}

// -------------------- UPDATE ACCOUNT -------------------------------------------
// update email or password?

// -------------------- DELETE ACCOUNT -------------------------------------------
// admin only?

exports.deleteAccountByUserAccountID = function(userAccountID,callback){
	const query = 'DELETE FROM User WHERE userAccountID = ?'
	const values = [userAccountID]

	db.query(query, values, function (error) {
		if (error) {
			// TODO: Look for usernameUnique violation.
			callback(['databaseError when try to delte user'], null)
		} else {
			callback([])
		}
	})
}