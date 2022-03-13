const { models } = require('./dbSequelize')



module.exports = function () {
	return {

		//används denna funktion?
		getAllAccounts: function (callback) {

			models.UserAccount.findAll({
				order: [
					['username', 'ASC'],
				],
			}).then((userAccounts) => {
				console.log("user accounts: ", userAccounts)
				callback(userAccounts.dataValues)

			}).catch((error) => {
				console.log("error: ", error)
			})
		},
		/*getAllAccounts: function (callback) {

			const query = `SELECT * FROM UserAccount ORDER BY username`
			const values = []

			db.query(query, values, function (error, UserAccount) {
				if (error) {
					callback(['databaseError'], null)
				} else {
					callback([], UserAccount)
				}
			})
		},*/


		getAccountByUsername: function (username, callback) {

			models.UserAccount.findOne({
				where: { username: username }

			}).then((userAccount) => {
				console.log("user account: ", userAccount.dataValues)
				callback([], userAccount.dataValues)

			}).catch((error) => {
				console.log("error: ", error)
			})
		},
		/*getAccountByUsername: function (username, callback) {

			const query = `SELECT * FROM UserAccount WHERE username = ? LIMIT 1`
			const values = [username]

			db.query(query, values, function (error, UserAccount) {
				if (error) {
					callback(['databaseError'], null)
				} else {
					callback([], UserAccount[0])
				}
			})
		},*/


		createAccount: function (newAccount, callback) {

			models.UserAccount.create({
				username: newAccount.username,
				passwordHash: newAccount.passwordHash

			}).then((userAccount) => {
				console.log("created account: ", userAccount)
				callback([],userAccount.dataValues)

			}).catch((error) => {
				console.log("error: ", error)
			})

		},
		/*createAccount: function (account, callback) {

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

		},*/


		deleteAccountByUserAccountID: function (userAccount, callback) {

			models.UserAccount.destroy({
			
				where: { userAccountID: userAccount.userAccountID}

			}).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
				if(rowDeleted === 1){
				   console.log('Deleted successfully');
				 }
			  }, function(err){
				  console.log(err); 
			  });
			
		},

		/*deleteAccountByUserAccountID: function (userAccountID, callback) {
			const query = 'DELETE FROM UserAccount WHERE userAccountID = ?'
			const values = [userAccountID]

			db.query(query, values, function (error) {
				if (error) {
					console.log("inne i error")
					// TODO: Look for usernameUnique violation.
					callback(['databaseError when try to delte user'], null)
				} else {
					console.log("inne i else")
					callback([])
				}
			})
		}*/

	}
}