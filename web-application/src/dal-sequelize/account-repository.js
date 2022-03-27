const { models } = require('./dbSequelize')

module.exports = function () {
	return {

		createAccount: function (newAccount, callback) {

			models.UserAccount.create({
				username: newAccount.username,
				passwordHash: newAccount.hashPassword

			}).then((userAccount) => {
				callback([], userAccount.dataValues)
			}).catch((error) => {
				callback(error, [])
			})
		},

		getAccountByUsername: function (username, callback) {

			models.UserAccount.findOne({
				raw: true,
				nest: true,
				where: { username: username },
				include: [{
					required: true,
					model: models.User,
				}]
			}).then((userAccount) => {
				callback([], userAccount)
			}).catch((error) => {
				callback(error, [])
			})
		},

		deleteAccountByUserAccountID: function (userAccount, callback) {

			models.UserAccount.destroy({
				where: { userAccountID: userAccount.userAccountID }

			}).then(function (rowDeleted) {
				if (rowDeleted === 1) {
					console.log('Deleted successfully');
					callback([])
				} else {
					callback(error = "Internal server error")
				}
			}).catch((error) => {
				callback(error)
			})
		},

	}
}