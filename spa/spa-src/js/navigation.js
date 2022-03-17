document.addEventListener('DOMContentLoaded', function () {

	const anchors = document.querySelectorAll('a')

	for (const anchor of anchors) {

		anchor.addEventListener('click', function (event) {
			event.preventDefault()

			const url = anchor.getAttribute('href')

			history.pushState(null, "", url)

			hideCurrentPage()
			showPage(url)

		})

	}

	showPage(location.pathname)

})

window.addEventListener('popstate', function () {

	hideCurrentPage()
	showPage(location.pathname)

})

function hideCurrentPage() {
	document.querySelector('.current-page').classList.remove('current-page')
}

function showPage(url) {

	let nextPageId

	switch (url) {

		case '/':
			nextPageId = 'start-page'
			loadStartPage()
			break

		case '/about':
			nextPageId = 'about-page'
			break

		case '/ads':
			nextPageId = 'ads-page'
			loadAdsPage()
			break

		default:
			if (url.startsWith("/ads/")) {
				const [empty, ads, id] = url.split("/")
				console.log(id);

				nextPageId = 'ad-page'
				loadAdPage(id)
			} else {
				nextPageId = 'not-found-page'
			}

	}

	document.getElementById(nextPageId).classList.add('current-page')

}