const userRepository = require('../data-access-layer/user-repository')


exports.getUserByAccountID = function (userAccountID, callback) {
	userRepository.getUserByAccountID(userAccountID, callback)
}

exports.getUserByUserID = function (userID, callback) {
	userRepository.getUserByUserID(userID, callback)
}

exports.updateUserByUserID = function (userID, firstName, lastName, email, phoneNumber, city, callback) {
	userRepository.updateUserByUserID(userID, firstName, lastName, email, phoneNumber, city, callback)
}

exports.createUser = function(User, callback){
	userRepository.createUser(User,callback)
}

