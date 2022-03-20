module.exports = function () {
	return {

		getUpdateUserPersonalDataErrors: function (User) {

			const firstNameErrors = []
			const lastNameErrors = []
			const emailErrors = []
			const phoneNumberErrors = []
			const cityErrors = []

			const emptyFieldErrorMsg = "this field is mandatory"


			if (!User.firstName.length) {
				firstNameErrors.push(emptyFieldErrorMsg)
			}

			if (!User.lastName.length) {
				lastNameErrors.push(emptyFieldErrorMsg)
			}

			if (!User.email.length) {
				emailErrors.push(emptyFieldErrorMsg)
			}

			if (!User.phoneNumber.length) {
				phoneNumberErrors.push(emptyFieldErrorMsg)
			}

			if (!User.city.length) {
				cityErrors.push(emptyFieldErrorMsg)
			}

			
			return [firstNameErrors, lastNameErrors, emailErrors, phoneNumberErrors, cityErrors]
		}

	}
}