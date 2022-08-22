document.addEventListener('DOMContentLoaded', function () {

	const anchors = document.querySelectorAll('a')
	const signInButton = document.getElementById("sign-in-form-button")
	const signInBody = document.getElementById("sign-in-body")
	const signOutBody = document.getElementById("sign-out-body")
	const signOutButton = document.getElementById("sign-out-form-button")

	signInButton.addEventListener('click', function (event) {
		event.preventDefault()
	})

	signOutButton.addEventListener('click', function (event) {
		const url = "/"
		hideCurrentPage()
		showPage(url)
		setPushState(url)

		signInBody.classList.remove("hidden-sign-in-out")
		signOutBody.classList.add("hidden-sign-in-out")

		sessionStorage.setItem("token", "No token here")
	})

	for (const anchor of anchors) {

		anchor.addEventListener('click', function (event) {
			event.preventDefault()

			const url = anchor.getAttribute('href')

			setPushState(url)
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

		case '/ads/adCreate':
			nextPageId = 'create-ad-page'
			createAd()
			break

		case '/my-account/ads':
			nextPageId = 'my-ads-page'
			loadMyAdsPage()
			break

		case '/accounts/myBids':
			nextPageId = 'my-bids-page'
			break

		case '/accounts/create':
			nextPageId = 'create-account-page'
			createAccount()
			break

		case '/my-account/personal-data':
			nextPageId = 'personal-data-page'
			loadPersonalData()
			break

		case '/accounts/sign-in':
			nextPageId = 'start-page'
			break

		default:
			if (url.startsWith("/ads/adUpdate/")) {

				const [empty, ads, adUpdate, id] = url.split("/")
				nextPageId = 'update-ad-page'
				loadAdUpdatePage(id)
				break
			}
			if (url.startsWith("/ads/adDelete/")) {

				const [empty, ads, aDelete, id] = url.split("/")
				nextPageId = 'delete-ad-page'
				loadAdDeletePage(id)
				break
			}

			if (url.startsWith("/ads/")) {

				const [empty, ads, id] = url.split("/")
			
				nextPageId = 'ad-page'
				loadAdPage(id)
			} else {

				nextPageId = 'not-found-page'
			}
	}

	document.getElementById(nextPageId).classList.add('current-page')
}

//Displays a loading indicator for 1 sec
function timeOut(url) {
	const loadingTime = 1000

	hideCurrentPage()
	document.getElementById("loader-spinner").classList.add('current-page')

	setTimeout(function () {
		document.getElementById("loader-spinner").classList.remove('current-page')
		showPage(url)
	}, loadingTime)
}

//setting history.pushState
function setPushState(url) {
	history.pushState(null, "", url)
}