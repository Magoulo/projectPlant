const bcrypt = require('bcryptjs')
const salt = 13

module.exports = function ({ accountRepository, accountValidator }) {
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
				if (0 < errors[i].length) {
					errorsExist = true
				}
			}

			if (errorsExist) {
				callback(errors, null)
			} else {
				newAccount.hashPassword = bcrypt.hashSync(newAccount.repeatedPassword, salt)
				accountRepository.createAccount(newAccount, callback)
			}
		},

		deleteAccountByUserAccountID: function (userAccountID, callback) {
			accountRepository.deleteAccountByUserAccountID(userAccountID, callback)
		}

	}
}