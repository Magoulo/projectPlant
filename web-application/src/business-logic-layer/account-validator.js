const MIN_USERNAME_LENGTH = 3
const MAX_USERNAME_LENGTH = 10

const MIN_PASSWORD_LENGTH = 3
const MAX_PASSWORD_LENGTH = 10

module.exports = function () {
	return {

		getCreateNewAccountErrors: function (newAccount) {
			const usernameErrors = []
			const passwordErrors = []


			// Validating username
			if (!newAccount.username.length) {
				usernameErrors.push("this field is mandatory")
			} else {

				if (newAccount.username.length < MIN_USERNAME_LENGTH) {
					usernameErrors.push("username must be at least 3 characters long")
				}

				else if (MAX_USERNAME_LENGTH < newAccount.username.length) {
					usernameErrors.push("username must be under 11 characters long")
				}
			}

			// Validating password
			if (!newAccount.password.length) {
				passwordErrors.push("this field is mandatory")
			} else {

				if (newAccount.password != newAccount.repeatedPassword) {
					passwordErrors.push("password fields do not match")
				} else {

					if (newAccount.username.length < MIN_PASSWORD_LENGTH) {
						passwordErrors.push("password must be at least 3 characters long")
					}

					else if (MAX_PASSWORD_LENGTH < newAccount.username.length) {
						passwordErrors.push("password must be under 11 characters long")
					}
				}
			}

			return [usernameErrors, passwordErrors]
		}

	}
}