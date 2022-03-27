async function loadAdsPage() {

	const response = await fetch("http://localhost:3000/ads")
	const statusCode = response.status

	if (statusCode == 200) {

		const ads = await response.json()
		const allAdsUl = document.getElementById('all-plant-ads')
		allAdsUl.innerText = ""

		for (const ad of ads) {

			//Ad title
			const h3title = document.createElement('h3')
			const aTitle = document.createElement('a')

			h3title.innerText = ad.title
			aTitle.appendChild(h3title)
			aTitle.setAttribute('href', "/ads/" + ad.id)

			//Ad image
			const aImage = document.createElement('a')
			aImage.setAttribute('href', "/ads/" + ad.id)

			const imgImage = document.createElement('img')
			imgImage.setAttribute('src', "/images/" + ad.ImageBundle.coverImagePath)
			imgImage.classList.add("img-thumbnail")

			aImage.append(imgImage)

			//Createing list elements and assigning class
			const liIitle = document.createElement('li')
			const liImage = document.createElement('li')
			const divider = document.createElement('hr')
			divider.classList.add("divider-style")

			liIitle.classList.add("hidden-list")
			liImage.classList.add("hidden-list")

			//Appending elements to parent
			liIitle.appendChild(aTitle)
			liImage.appendChild(aImage)

			allAdsUl.appendChild(liIitle)
			allAdsUl.appendChild(liImage)
			allAdsUl.appendChild(divider)

			//EventListeners for title and image
			aTitle.addEventListener('click', function (event) {
				event.preventDefault()

				const url = aTitle.getAttribute("href")
				hideCurrentPage()
				showPage(url)
				setPushState(url)
			})
			aImage.addEventListener('click', function (event) {
				event.preventDefault()

				const url = aImage.getAttribute("href")
				hideCurrentPage()
				showPage(url)
				setPushState(url)
			})
		}
	} else if (statusCode == 500) {
		const error = document.createElement('p')
		error.innerText = "Internal Server Error"

		const allAdsUl = document.querySelector("#start-page ")

	}

}