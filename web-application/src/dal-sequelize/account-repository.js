const { models } = require('./dbSequelize')

module.exports = function () {
	return {

		createAccount: function (newAccount, callback) {

			models.UserAccount.create({
				username: newAccount.username,
				passwordHash: newAccount.hashPassword

			}).then((userAccount) => {
				callback([], userAccount.dataValues)
			}).catch((errors) => {
				errors = ["Internal server error"]
				callback(errors, [])
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
			}).catch((errors) => {
				errors = ["Internal server error"]
				callback(errors, [])
			})
		},

		deleteAccountByUserAccountID: function (userAccount, callback) {

			models.UserAccount.destroy({
				where: { userAccountID: userAccount.userAccountID }

			}).then(function (rowDeleted) {
				if (rowDeleted === 1) {
					callback([])
				} else {
					callback(errors = ["Internal server error"])
				}
			}).catch((errors) => {
				errors = ["Internal server error"]
				callback(errors)
			})
		},

	}
}