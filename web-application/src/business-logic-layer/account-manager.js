const accountRepository = require('../data-access-layer/account-repository')
const accountValidator = require('./account-validator')

exports.getAllAccounts = function (callback) {
	accountRepository.getAllAccounts(callback)
}

exports.createAccount = function (account, callback) {

	// Validate the account.
	const errors = accountValidator.getErrorsNewAccount(account)

	if (0 < errors.length) {
		callback(errors, null)
		return
	}

	accountRepository.createAccount(account, callback)

}

exports.getAccountByUsername = function (username, callback) {
	accountRepository.getAccountByUsername(username, callback)
}

exports.getUserByID = function (userAccountID, callback) {
	accountRepository.getUserByID(userAccountID, callback)
}

exports.getAdByUserID = function (userID, callback) {
	accountRepository.getAdByUserID(userID, callback)
}

exports.getImageBundleByAdID = function (adID, callback) {
	accountRepository.getImageBundleByAdID(adID, callback)
}

exports.getBidByAdID = function (adID, callback) {
	accountRepository.getBidByAdID(adID, callback)
}