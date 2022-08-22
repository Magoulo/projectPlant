const MIN_TITLE_LENGTH = 5
const MAX_TITLE_LENGTH = 31
const MIN_DESCRIPTION_LENGTH = 10
const MAX_DESCRIPTION_LENGTH = 201

module.exports = function () {
	return {

		getAdErrors: function (Ad) {

			const titleErrors = []
			const latinNameErrors = []
			const descriptionErrors = []

			const emptyFieldErrorMsg = "this field is mandatory"

			console.log("CHECKING AD ERRORS")


			if (!Ad.title.length) {
				titleErrors.push(emptyFieldErrorMsg)
			} else {

				if (Ad.title.length <= MIN_TITLE_LENGTH) {
					titleErrors.push("title must be at least " + MIN_TITLE_LENGTH + " characters long")
				}

				else if (MAX_TITLE_LENGTH < Ad.title.length) {
					titleErrors.push("title must be under " + MAX_TITLE_LENGTH + " characters long")
				}
			}

			if (!Ad.description.length) {
				descriptionErrors.push(emptyFieldErrorMsg)
			} else {

				if (Ad.description.length <= MIN_DESCRIPTION_LENGTH) {
					descriptionErrors.push("description must be at least " + MIN_DESCRIPTION_LENGTH + " characters long")
				}

				else if (MAX_DESCRIPTION_LENGTH < Ad.description.length) {
					descriptionErrors.push("description must be under " + MAX_DESCRIPTION_LENGTH + " characters long")
				}
			}

			if (!Ad.latinName.length) {
				latinNameErrors.push(emptyFieldErrorMsg)
			}

			return [titleErrors, latinNameErrors, descriptionErrors]
		}

	}
}