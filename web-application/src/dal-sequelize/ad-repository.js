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
			}).catch((error) => {
				callback(error, [])
			})
		},

		createImageBundle: function (imageBundle, callback) {

			models.ImageBundle.create({
				coverImagePath: imageBundle.coverImagePath,
				firstImagePath: imageBundle.firstImagePath,
				secondImagePath: imageBundle.secondImagePath,
				adID: imageBundle.adID

			}).then((imageBundle) => {
				callback([], imageBundle.dataValues)
			}).catch((error) => {
				callback(error, [])
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
			}).catch((error) => {
				callback(error, [])
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
			}).catch((error) => {
				callback(error, [])
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
			}).catch((error) => {
				callback(error, [])
			})
		},

		getAdByUserID: function (userID, callback) {

			models.Ad.findOne({
				where: { userID: userID }

			}).then((Ad) => {
				callback([], Ad.dataValues)

			}).catch((error) => {
				callback(error, [])
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
			}).catch((error) => {
				callback(error, [])
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
			}).catch((error) => {
				callback(error, [])
			})
		},

		getImageBundleByAdID: function (adID, callback) {

			models.ImageBundle.findOne({
				where: { adID: adID }

			}).then((ImageBundle) => {
				callback([], ImageBundle.dataValues)
			}).catch((error) => {
				callback(error, [])
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
			}).catch((error) => {
				callback(error, [])
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
				}).catch((error) => {
					callback(error, [])
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
				}).catch((error) => {
					callback(error, [])
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
			}).catch((error) => {
				callback(error)
			})
		},

	}
}