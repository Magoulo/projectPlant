const express = require('express')

module.exports = function ({ adManager }) {
	const router = express.Router()

	router.get("/", function (request, response) {
		adManager.getAllAds(function (errors, Ad) {

			if (errors.length) {
				response.status(500).json(errors)
			} else {
				response.status(200).json(Ad)
			}
		})
	})

	return router
}