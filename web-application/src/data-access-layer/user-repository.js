const db = require('./db')

module.exports = function () {
	return {

		getUserByAccountID: function (userAccountID, callback) {

			const query = "SELECT * FROM User WHERE userAccountID = ? LIMIT 1"
			const values = [userAccountID]

			db.query(query, values, function (error, Users) {
				if (error) {
					callback(['databaseError'], null)
				} else {
					callback([], Users[0])
				}
			})
		},

		getUserByUserID: function (userID, callback) {

			const query = "SELECT * FROM User WHERE userID = ? LIMIT 1"
			const values = [userID]

			db.query(query, values, function (error, Users) {
				if (error) {
					callback(['databaseError'], null)
				} else {
					callback([], Users[0])
				}
			})
		},

		updateUserByUserID: function (userID, firstName, lastName, email, phoneNumber, city, callback) {

			const query = "UPDATE User SET firstName = ?, lastName = ?, email = ? , phoneNumber = ?, city = ? WHERE userID = ?"
			const values = [firstName, lastName, email, phoneNumber, city, userID]

			db.query(query, values, function (error) {
				if (error) {
					callback(['databaseError'])
				} else {
					callback([])
				}
			})
		},

		createUser: function (user, callback) {

			const query = `INSERT INTO User (userAccountID, firstName, lastName, email, phoneNumber, city) VALUES (?, ?, ?, ?, ?, ?)`
			const values = [user.userAccountID, user.firstName, user.lastName, user.email, user.phoneNumber, user.city]

			db.query(query, values, function (error, results) {
				if (error) {
					callback(['databaseError'], null)
				} else {
					callback([], results.insertId)
				}
			})
		}

	}
}