module.exports = function ({ userRepository, userValidator }) {
	return {

		getUserByAccountID: function (userAccountID, callback) {
			userRepository.getUserByAccountID(userAccountID, callback)
		},

		getUserByUserID: function (userID, callback) {
			userRepository.getUserByUserID(userID, callback)
		},

		updateUserByUserID: function (User, callback) {
			
			const errors = userValidator.getUpdateUserPersonalDataErrors(User)
			var errorsExist = false

			for (let i = 0; i < errors.length; i++) {
				if(0 < errors[i].length){
					errorsExist = true
				}
			  }

			if (errorsExist) {
				callback(errors, null)
			} else {
				userRepository.updateUserByUserID(User, callback)
			}
		},

		createUser: function (user, callback) {
			userRepository.createUser(user, callback)
		}

	}
}

