const adRepository = require('../data-access-layer/ad-repository')

exports.getAllAds = function (callback) {
	adRepository.getAllAds(callback)
}