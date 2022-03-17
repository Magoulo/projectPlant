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
			var errorsExist = false

			for (let i = 0; i < errors.length; i++) {
				if(0 < errors[i].length){
					errorsExist = true
				}
			  }

			if (errorsExist) {
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