const { models } = require('./dbSequelize')
const { Op } = require("sequelize");

module.exports = function ({ }) {
	return {

		//CREATE
		createAd: function (Ad, callback) {

			models.Ad.create({
				title: Ad.title,
				latinName: Ad.latinName,
				description: Ad.description,
				isClosed: Ad.isClosed,
				userID: Ad.userID

			}).then((Ad) => {
				callback([], Ad.dataValues)
			}).catch((errors) => {
				errors = ["Internal server error"]
				callback(errors, [])
			})
		},

		createImageBundle: function (imageBundle, callback) {

			models.ImageBundle.create({
				coverImageName: imageBundle.coverImageName,
				firstImageName: imageBundle.firstImageName,
				secondImageName: imageBundle.secondImageName,
				adID: imageBundle.adID

			}).then((imageBundle) => {
				callback([], imageBundle.dataValues)
			}).catch((errors) => {
				errors = ["Internal server error"]
				callback(errors, [])
			})
		},

		//READ
		getAllAds: function (callback) {

			models.Ad.findAll({
				raw: true,
				nest: true,
				where: { isClosed: false },
				include: [{
					required: true,
					model: models.ImageBundle,
				}],
			}).then((Ad) => {
				callback([], Ad)
			}).catch((errors) => {
				errors = ["Internal server error"]
				callback(errors, [])
			})
		},

		getAdByAdID: function (adID, callback) {

			models.Ad.findOne({
				raw: true,
				nest: true,
				where: { id: adID },
				include: [{
					required: true,
					model: models.ImageBundle,
				}],
			}).then((Ad) => {
				callback([], Ad)
			}).catch((errors) => {
				errors = ["Internal server error"]
				callback(errors, [])
			})
		},

		getAllAdsByUserID: function (userID, callback) {

			models.Ad.findAll({
				raw: true,
				nest: true,
				where: { userID: userID },
				include: [{
					required: true,
					model: models.ImageBundle,
				}],
			}).then((Ad) => {
				callback([], Ad)
			}).catch((errors) => {
				errors = ["Internal server error"]
				callback(errors, [])
			})
		},

		getAdByUserID: function (userID, callback) {

			models.Ad.findOne({
				where: { userID: userID }

			}).then((Ad) => {
				callback([], Ad.dataValues)

			}).catch((errors) => {
				errors = ["Internal server error"]
				callback(errors, [])
			})
		},

		getAllAdsBidsUsersByUserID: function (userID, callback) {

			models.Ad.findAll({
				raw: true,
				nest: true,
				where: { userID: userID },
				include: [{
					required: true,
					model: models.ImageBundle
				},
				{
					model: models.Bid,
					required: true,
					include: [{
						required: true,
						model: models.User
					}]
				}],
			}).then((Ad) => {
				callback([], Ad)
			}).catch((errors) => {
				errors = ["Internal server error"]
				callback(errors, [])
			})
		},

		getAllBidsAndUserByAdID: function (adID, callback) {

			models.Bid.findAll({
				raw: true,
				nest: true,
				where: { adID: adID },
				include: [{
					required: true,
					model: models.User,
					where: { userID: bid.userID }
				}],
			}).then((Bid) => {
				callback([], Bid)
			}).catch((errors) => {
				errors = ["Internal server error"]
				callback(errors, [])
			})
		},

		getImageBundleByAdID: function (adID, callback) {

			models.ImageBundle.findOne({
				where: { adID: adID }

			}).then((ImageBundle) => {
				callback([], ImageBundle.dataValues)
			}).catch((errors) => {
				errors = ["Internal server error"]
				callback(errors, [])
			})
		},

		getAllAdsByTitleOrLatinName: function (searchInput, callback) {

			models.Ad.findAll({
				raw: true,
				nest: true,
				where: {
					[Op.or]: [{
						title: { [Op.iLike]: '%' + searchInput + '%' }
					},
					{
						latinName: { [Op.iLike]: '%' + searchInput + '%' }
					}]
				},
				include: [{
					required: true,
					model: models.ImageBundle,
				}],
			}).then((Ad) => {
				callback([], Ad)
			}).catch((errors) => {
				errors = ["Internal server error"]
				callback(errors, [])
			})
		},

		//UPDATE
		updateAdByAdID: function (Ad, callback) {

			models.Ad.update({
				title: Ad.title,
				latinName: Ad.latinName,
				description: Ad.description,
			},
				{
					where: { id: Ad.id }

				}).then((Ad) => {
					callback([], Ad.dataValues)
				}).catch((errors) => {
					errors = ["Internal server error"]
					callback(errors, [])
				})
		},

		closeAd: function (adID, callback) {

			models.Ad.update({
				isClosed: 1,
			},
				{
					where: { id: adID }

				}).then((Ad) => {
					callback([], Ad.dataValues)
				}).catch((errors) => {
					errors = ["Internal server error"]
					callback(errors, [])
				})
		},

		//DELETE
		deleteAd: function (adID, callback) {

			models.Ad.destroy({
				where: { id: adID }

			}).then(function (rowDeleted) {
				if (rowDeleted === 1) {
					callback([])
				}
			}).catch((errors) => {
				errors = ["Internal server error"]
				callback(errors)
			})
		},

	}
}