async function loadStartPage() {

	const response = await fetch("http://localhost:3000")
	const statusCode = response.status

	const allAdsUl = document.getElementById('all-plant-ads-start-page')
	allAdsUl.innerText = ""

	if (statusCode == 200) {

		const ads = await response.json()

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
			aImage.addEventListener('click', function (event) { //vf funkar inte denna nu då?
				event.preventDefault()

				const url = aImage.getAttribute("href") // null
				hideCurrentPage()
				showPage(url)
				setPushState(url)
			})
		}
	}

	if (statusCode == 500) {

		const pError = document.createElement('p')
		pError.innerText = response.statusText

		allAdsUl.appendChild(pError)
	}
}