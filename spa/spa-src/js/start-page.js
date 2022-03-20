async function loadStartPage(){

    const response = await fetch("http://localhost:3000")

    // TODO: Check status code and act accordingly!


    const ads = await response.json()

    const allAdsUl = document.getElementById('all-plant-ads-start-page')
    allAdsUl.innerText = ""

    for(const ad of ads){
        const aTitle = document.createElement('a')
        aTitle.innerText = ad.title
        aTitle.setAttribute('href',"/ads/" + ad.id)

        const aImage = document.createElement('a')
        aImage.setAttribute('href',"/ads/" + ad.id)

        const imgImage = document.createElement('img')
        imgImage.setAttribute('src',"/images/"+ad.ImageBundle.coverImagePath)
        
        aImage.appendChild(imgImage)
		const liIitle = document.createElement('li')
		const liImage = document.createElement('li')
		liIitle.appendChild(aTitle)
        liImage.appendChild(aImage)
		
	    allAdsUl.appendChild(liIitle)
	    allAdsUl.appendChild(liImage)
    }
}