const MIN_USERNAME_LENGTH = 3
const MAX_USERNAME_LENGTH = 10

const MIN_PASSWORD_LENGTH = 3
const MAX_PASSWORD_LENGTH = 10

module.exports = function () {
	return {

		getCreateNewAccountErrors: function (newAccount) {

			const usernameErrors = []
			const passwordErrors = []
			const firstNameErrors = []
			const lastNameErrors = []
			const emailErrors = []
			const phoneNumberErrors = []
			const cityErrors = []
			
			const emptyFieldErrorMsg = "this field is mandatory"


			if (!newAccount.username.length) {
				usernameErrors.push(emptyFieldErrorMsg)
			} else {

				if (newAccount.username.length < MIN_USERNAME_LENGTH) { // See if username alrady exists? 
					usernameErrors.push("username must be at least 3 characters long")
				}

				else if (MAX_USERNAME_LENGTH < newAccount.username.length) {
					usernameErrors.push("username must be under 11 characters long")
				}
			}

			if (!newAccount.password.length) {
				passwordErrors.push(emptyFieldErrorMsg)
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
		}

	}
}