const { models } = require('./dbSequelize')

module.exports = function () {
	return {

		getUserByAccountID: function (userAccountID, callback) {

			models.User.findOne({
				raw: true,
				nest: true,
				where: { userAccountID: userAccountID }

			}).then((User) => {
				callback([], User)
			}).catch((errors) => {
				errors = ["Internal server error"]
				callback(errors, [])
			})
		},

		getUserByUserID: function (userID, callback) {

			models.User.findOne({
				raw: true,
				nest: true,
				where: { id: userID }
			}).then((User) => {
				callback([], User)
			}).catch((errors) => {
				errors = ["Internal server error"]
				callback(errors, [])
			})
		},

		updateUserByUserID: function (User, callback) {

			models.User.update({
				firstName: User.firstName,
				lastName: User.lastName,
				email: User.email,
				phoneNumber: User.phoneNumber,
				city: User.city
			},
				{
					where: { id: User.id }
				}).then((User) => {
					callback([], User.dataValues)
				}).catch((errors) => {
					errors = ["Internal server error"]
					callback(errors, [])
				})
		},

		createUser: function (User, callback) {

			models.User.create({
				firstName: User.firstName,
				lastName: User.lastName,
				email: User.email,
				phoneNumber: User.phoneNumber,
				city: User.city,
				userAccountID: User.userAccountID

			}).then((User) => {
				callback([], User.dataValues)
			}).catch((errors) => {
				errors = ["Internal server error"]
				callback(errors, [])
			})
		}

	}
}