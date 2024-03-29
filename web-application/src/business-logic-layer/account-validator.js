const bcrypt = require('bcryptjs')

const MIN_USERNAME_LENGTH = 3
const MAX_USERNAME_LENGTH = 21
const MIN_PASSWORD_LENGTH = 3
const MAX_PASSWORD_LENGTH = 21

module.exports = function ({ accountRepository }) {
	return {

		getCreateNewAccountErrors: function (newAccount) {

			const usernameErrors = []
			const passwordErrors = []
			const firstNameErrors = []
			const lastNameErrors = []
			const emailErrors = []
			const phoneNumberErrors = []
			const cityErrors = []

			const emptyFieldErrorMsg = "This field is mandatory"


			if (!newAccount.username.length) {
				usernameErrors.push(emptyFieldErrorMsg)
			} else {

				accountRepository.getAccountByUsername(newAccount.username, function (errors, UserAccount) {
					if (!UserAccount) {

						if (newAccount.username.length <= MIN_USERNAME_LENGTH) {
							usernameErrors.push("Username must be over " + MIN_USERNAME_LENGTH + " characters")
						}

						else if (MAX_USERNAME_LENGTH < newAccount.username.length) {
							usernameErrors.push("Username must be under " + MAX_USERNAME_LENGTH + " characters")
						}

					} else {
						usernameErrors.push("Username already taken")
					}
				})
			}


			if (!newAccount.password.length) {
				passwordErrors.push(emptyFieldErrorMsg)

			} else {
				if (newAccount.password != newAccount.repeatedPassword) {
					passwordErrors.push("Password fields do not match")
				} else {

					if (newAccount.password.length < MIN_PASSWORD_LENGTH) {
						passwordErrors.push("Password must be over " + MIN_PASSWORD_LENGTH + " characters")
					}

					else if (MAX_PASSWORD_LENGTH < newAccount.password.length) {
						passwordErrors.push("Password must be under " + MAX_PASSWORD_LENGTH + " characters")
					}
				}
			}


			if (!newAccount.firstName.length) {
				firstNameErrors.push(emptyFieldErrorMsg)
			}

			if (!newAccount.lastName.length) {
				lastNameErrors.push(emptyFieldErrorMsg)
			}

			if (!newAccount.email.length) {
				emailErrors.push(emptyFieldErrorMsg)
			}

			if (!newAccount.phoneNumber.length) {
				phoneNumberErrors.push(emptyFieldErrorMsg)
			}

			if (!newAccount.city.length) {
				cityErrors.push(emptyFieldErrorMsg)
			}


			return [usernameErrors, passwordErrors, firstNameErrors, lastNameErrors, emailErrors, phoneNumberErrors, cityErrors]
		},

		isCorrectPassword: function (signInInput, UserAccount) {
			if (signInInput.username == UserAccount.username && bcrypt.compareSync(signInInput.password, UserAccount.passwordHash)) {
				return true
			} else {
				return false
			}
		}
	}
}