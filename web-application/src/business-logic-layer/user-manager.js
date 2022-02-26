const userRepository = require('../data-access-layer/user-repository')


exports.getUserByAccountID = function (userAccountID, callback) {
	userRepository.getUserByAccountID(userAccountID, callback)
}

exports.getUserByUserID = function (userID, callback) {
	userRepository.getUserByUserID(userID, callback)
}
