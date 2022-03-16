async function loadAdsPage(id) {

	const response = await fetch("http://localhost:3000/")

	// TODO: Check status code and act accordingly!

	const ads = await response.json()
	for (ad in ads) {
		document.getElementById('ad-id').innerText = ad.id
		document.getElementById('ad-title').innerText = ad.title
		document.getElementById('ad-latinName').innerText = ad.latinName
		document.getElementById('ad-description').innerText = ad.description
	}

}