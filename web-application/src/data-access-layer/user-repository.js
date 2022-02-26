const db = require('./db')

// -------------------- GET USER -----------------------------------

exports.getUserByAccountID = function (userAccountID, callback) {

	const query = "SELECT * FROM User WHERE userAccountID = ? LIMIT 1"
	const values = [userAccountID]

	db.query(query, values, function (error, User) {
		if (error) {
			callback(['databaseError in user table'], null)
		} else {
			callback([], User[0])
		}
	})
}

exports.getUserByUserID = function (userID, callback) {
	
	const query = "SELECT * FROM User WHERE userID = ? LIMIT 1"
	const values = [userID]

	db.query(query, values, function (error, User) {
		if (error) {
			callback(['databaseError in User table'], null)
		} else {
			callback([], User[0])
		}
	})
}