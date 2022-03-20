const MIN_MESSAGE_LENGTH = 10
const MAX_MESSAGE_LENGTH = 200

module.exports = function () {
	return {

		getPlaceBidErrors: function (Bid) {

			const msgErrors = []
			const emptyFieldErrorMsg = "Could not place bid because message field was empty"


			if (!Bid.message.length) {
				msgErrors.push(emptyFieldErrorMsg)
			} else {

				if (Bid.message.length < MIN_MESSAGE_LENGTH) {
					msgErrors.push("Could not place bid because message field must be at least 3 characters long")
				}

				else if (MAX_MESSAGE_LENGTH < newAccount.username.length) {
					msgErrors.push("Could not place bid because message field must be under 200 characters long")
				}
			}

			return msgErrors
		}


	}
}