const bcrypt = require('bcryptjs')
const salt = 13

module.exports = function ({ accountRepository, accountValidator, helperFunctions }) {
	return {

		getAllAccounts: function (callback) {
			accountRepository.getAllAccounts(callback)
		},

		getAccountByUsername: function (username, callback) {
			accountRepository.getAccountByUsername(username, callback)
		},

		createAccount: function (newAccount, callback) {

			const errors = accountValidator.getCreateNewAccountErrors(newAccount)
			var errorsExist = helperFunctions.hasErrors(errors)

			if (errorsExist) {
				callback(errors, null)
			} else {
				newAccount.hashPassword = bcrypt.hashSync(newAccount.repeatedPassword, salt)
				accountRepository.createAccount(newAccount, callback)
			}
		},

		deleteAccountByUserAccountID: function (userAccountID, callback) {
			accountRepository.deleteAccountByUserAccountID(userAccountID, callback)
		},

		isCorrectPassword: function (signInInput, UserAccount) {
			var isCorrectPassword = accountValidator.isCorrectPassword(signInInput, UserAccount)
			return isCorrectPassword
		}

	}
}