document.addEventListener('DOMContentLoaded', function () {

	const anchors = document.querySelectorAll('a')
	const signInButton = document.getElementById("sign-in-form-button")
	const signInBody = document.getElementById("sign-in-body")
	const signOutBody = document.getElementById("sign-out-body")
	const signOutButton = document.getElementById("sign-out-form-button")
	const menuLoadingSpinner = document.getElementById("menu-loader-spinner")

	//simulateing 5 sec loading when logging in
	signInButton.addEventListener('click', function (event) {
		event.preventDefault()
		signInBody.classList.add("hidden-sign-in-out")
		menuLoadingSpinner.classList.remove("hidden-sign-in-out")
		
		setTimeout(function () {
			signOutBody.classList.remove("hidden-sign-in-out")
			menuLoadingSpinner.classList.add("hidden-sign-in-out")
		}, 5000)

	})

	signOutButton.addEventListener('click', function (event) {
		event.preventDefault()

		signInBody.classList.remove("hidden-sign-in-out")
		signOutBody.classList.add("hidden-sign-in-out")
		showPage("/")
		sessionStorage.setItem("token", "No token here")
		console.log("sessionStorage token: ", sessionStorage.token)
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

		case '/about':
			nextPageId = 'about-page'
			break

		case '/ads':
			nextPageId = 'ads-page'
			loadAdsPage()
			break

		case '/ads/adCreate':
			nextPageId = 'create-ad-page'
			createAd()
			break

		case '/accounts/myAds':
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

		case '/accounts/personalData':
			nextPageId = 'personal-data-page'
			loadPersonalData(1)
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
				console.log(id);
				nextPageId = 'ad-page'
				loadAdPage(id)
			} else {

				nextPageId = 'not-found-page'
			}
	}

	document.getElementById(nextPageId).classList.add('current-page')

}

//Displays a loading indicator for 5 sec
function timeOut(url) {

	hideCurrentPage()
	document.getElementById("loader-spinner").classList.add('current-page')
	setTimeout(function () {

		document.getElementById("loader-spinner").classList.remove('current-page')
		showPage(url)

	}, 5000)

}

//setting history.pushState
function setPushState(url) {
	history.pushState(null, "", url)
}