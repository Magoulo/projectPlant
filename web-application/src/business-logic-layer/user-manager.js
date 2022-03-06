const userRepository = require('../data-access-layer/user-repository')


module.exports = function ({ userRepository }) {
	return{

		getUserByAccountID: function (userAccountID, callback) {
			userRepository.getUserByAccountID(userAccountID, callback)
		},
	
		getUserByUserID: function (userID, callback) {
			userRepository.getUserByUserID(userID, callback)
		},
	
		updateUserByUserID: function (userID, firstName, lastName, email, phoneNumber, city, callback) {
			userRepository.updateUserByUserID(userID, firstName, lastName, email, phoneNumber, city, callback)
		},
	
		createUser: function (user, callback) {
			userRepository.createUser(user, callback)
		}
		
	}
}

