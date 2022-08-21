const { models } = require('./dbSequelize')

module.exports = function () {
	return {

		getAllBidsByAdID: function (adID, callback) {

			models.Bid.findAll({
				raw: true,
				nest: true,
				where: { adID: adID }

			}).then((Bids) => {
				callback([], Bids)
			}).catch((errors) => {
				errors = ["Internal server error"]
				callback(errors, [])
			})
		},

		getBidByAdID: function (adID, callback) {

			models.Bid.findOne({
				raw: true,
				nest: true,
				where: { adID: adID }

			}).then((Bid) => {
				callback([], Bid)
			}).catch((errors) => {
				errors = ["Internal server error"]
				callback(errors, [])
			})
		},

		getBidByBidID: function (bidID, callback) {

			models.Bid.findOne({
				raw: true,
				nest: true,
				where: { id: bidID },

			}).then((Bid) => {
				callback([], Bid)
			}).catch((errors) => {
				errors = ["Internal server error"]
				callback(errors, [])
			})
		},

		getAllBidsByUserID: function (userID, callback) {

			models.Bid.findAll({
				raw: true,
				nest: true,
				where: { userID: userID },
				include: [{
					model: models.Ad,
					required: true,
					include: [{
						required: true,
						model: models.ImageBundle,
					}],
				}],
			}).then((Bids) => {
				callback([], Bids)
			}).catch((errors) => {
				errors = ["Internal server error"]
				callback(errors, [])
			})
		},

		createBid: function (Bid, callback) {

			const date = new Date().toISOString().slice(0, 19).replace('T', ' ')
			const status = "Pending"

			models.Bid.create({
				date: date,
				imagePath: Bid.imagePath,
				message: Bid.message,
				status: status,
				adID: Bid.adID,
				userID: Bid.userID

			}).then((Bid) => {
				callback([], Bid)
			}).catch((errors) => {
				errors = ["Internal server error"]
				callback(errors, [])
			})
		},

		deleteBid: function (bidID, callback) {

			models.Bid.destroy({
				where: { id: bidID }

			}).then(function (rowDeleted) {
				if (rowDeleted === 1) {
					callback([])
				} else {
					callback(errors = ["Internal server error"])
				}
			}).catch((errors) => {
				errors = ["Internal server error"]
				callback(errors)
			})
		},

		updateBidByBidID: function (Bid, callback) {

			models.Bid.update({
				status: Bid.status,
			},
				{
					where: { id: Bid.bidID }

				}).then((Bid) => {
					callback([], Bid.dataValues)
				}).catch((errors) => {
					errors = ["Internal server error"]
					callback(errors, [])
				})
		},

		setAllBidsToDeclined: function (adID, callback) {

			const status = "Declined"

			models.Bid.update({
				status: status,
			},
				{
					where: { adID: adID }

				}).then((Bid) => {
					callback([], Bid.dataValues)
				}).catch((errors) => {
					errors = ["Internal server error"]
					callback(errors, [])
				})
		}

	}
}