module.exports = function ({ userRepository, userValidator, helperFunctions }) {
	return {

		getUserByAccountID: function (userAccountID, callback) {
			userRepository.getUserByAccountID(userAccountID, callback)
		},

		getUserByUserID: function (userID, callback) {
			userRepository.getUserByUserID(userID, callback)
		},

		updateUserByUserID: function (User, callback) {

			const errors = userValidator.getUpdateUserPersonalDataErrors(User)
			var errorsExist = helperFunctions.hasErrors(errors)

			if (errorsExist) {
				callback(errors, null)
			} else {
				userRepository.updateUserByUserID(User, callback)
			}
		},

		createUser: function (user, callback) {
			userRepository.createUser(user, callback)
		},

		isCorrectToken: function (accessToken, callback) {
			helperFunctions.isCorrectToken(accessToken, callback)
		},

		userHasAccess: function (userID, savedID, callback) {
			var isAuthenticated = helperFunctions.userHasAccess(userID, savedID)
			callback(isAuthenticated)
		}

	}
}

