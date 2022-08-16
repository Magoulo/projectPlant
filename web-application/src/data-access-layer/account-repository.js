const db = require('./db')

module.exports = function () {
	return {

		getAllAccounts: function (callback) {

			const query = `SELECT * FROM UserAccount ORDER BY username`
			const values = []

			db.query(query, values, function (error, UserAccount) {
				if (error) {
					callback(['databaseError'], null)
				} else {
					callback([], UserAccount)
				}
			})
		},

		getAccountByUsername: function (username, callback) {

			const query = `SELECT * FROM UserAccount WHERE username = ? LIMIT 1`
			const values = [username]

			db.query(query, values, function (error, UserAccounts) {
				if (error) {
					callback(['databaseError'], null)
				} else {
					callback([], UserAccounts[0])
				}
			})
		},

		createAccount: function (account, callback) {

			const query = `INSERT INTO UserAccount (username, passwordHash) VALUES (?, ?)`
			const values = [account.username, account.passwordHash]

			db.query(query, values, function (error, userAccountID) {
				if (error) {
					callback(['databaseError'], null)
				} else {
					callback(error, userAccountID.insertId)
				}
			})

		},

		deleteAccountByUserAccountID: function (userAccountID, callback) {
			const query = 'DELETE FROM UserAccount WHERE userAccountID = ?'
			const values = [userAccountID]

			db.query(query, values, function (error) {
				if (error) {
					callback(['databaseError when try to delte user'], null)
				} else {
					callback([])
				}
			})
		}

	}
}