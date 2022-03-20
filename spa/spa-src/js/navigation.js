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

		case '/accounts/myAds':
			nextPageId = 'my-ads-page'
			loadMyAdsPage()
			break

		case '/accounts/myBids':
			nextPageId = 'my-bids-page'
			break
		
		case '/accounts/personalData' :
			nextPageId = 'personal-data-page'
			loadPersonalData(1)
			break

		case '/accounts/sign-in':
			nextPageId = 'start-page'
			signIn()
			break	
		default:
			

			if (url.startsWith("/ads/")) { // problemet med att consolen samt globaler laddas om/ resetas verkar vara att ett element skapat från ads-filen appends as child clickas på
				
				const [empty, ads, id] = url.split("/")
				console.log(id);

				nextPageId = 'ad-page'
				loadAdPage(id)//loadAdsPage() issue is not here
			} else {
				
				nextPageId = 'not-found-page'
			}

	}

	document.getElementById(nextPageId).classList.add('current-page')

}

function showLogin(url){
	//TODO make a function like showPage function that displays the right state of the login part (login/logout)
}