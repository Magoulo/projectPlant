const accountRepository = require('../data-access-layer/account-repository')
const accountValidator = require('./account-validator')


module.exports = function ({ accountRepository, accountValidator}) {
	return {

		getAllAccounts: function (callback) {
			accountRepository.getAllAccounts(callback)
		},


		getAccountByUsername: function (username, callback) {
			accountRepository.getAccountByUsername(username, callback)
		},


		createAccount: function (newAccount, callback) {
			const errors = accountValidator.getCreateNewAccountErrors(newAccount)

			if (0 < errors.length) {
				callback(errors, null)
			} else {
				accountRepository.createAccount(newAccount, callback)
			}
		},


		deleteAccountByUserAccountID: function (userAccountID, callback) {
			accountRepository.deleteAccountByUserAccountID(userAccountID, callback)
		}

	}
}