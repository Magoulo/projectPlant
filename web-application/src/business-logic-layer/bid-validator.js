const MIN_MESSAGE_LENGTH = 10
const MAX_MESSAGE_LENGTH = 201

module.exports = function () {
	return {

		getPlaceBidErrors: function (Bid) {
			const msgErrors = []

			if (!Bid.message.length) {
				msgErrors.push("Could not place bid because message field was empty")
			} else {

				if (Bid.message.length <= MIN_MESSAGE_LENGTH) {
					msgErrors.push("Could not place bid because message field must be at least" + MIN_MESSAGE_LENGTH + "characters long")
				}

				else if (MAX_MESSAGE_LENGTH < newAccount.message.length) {
					msgErrors.push("Could not place bid because message field must be under" + MAX_MESSAGE_LENGTH + "characters long")
				}
			}

			return msgErrors
		}
		
	}
}