const accountRepository = require('../data-access-layer/account-repository')
const accountValidator = require('./account-validator')


module.exports = function ({accountRepository}) {
	return{

		getAllAccounts: function (callback) {
			accountRepository.getAllAccounts(callback)
		},
	
		getAccountByUsername: function (username, callback) {
			accountRepository.getAccountByUsername(username, callback)
		},
	
		createAccount: function (account, callback) {
			// Validate the account.
			/*	const errors = accountValidator.getErrorsNewAccount(account)
			
				if (0 < errors.length) {
					callback(errors, null)
					return
				}*/
			accountRepository.createAccount(account, callback)
		},
	
		deleteAccountByUserAccountID: function (userAccountID, callback) {
			accountRepository.deleteAccountByUserAccountID(userAccountID, callback)
		}

	}
}