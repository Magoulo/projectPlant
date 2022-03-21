async function loadAdsPage(){
	console.log("token from global: ", sessionStorage.token)

	const response = await fetch("http://localhost:3000/ads")
	
	// TODO: Check status code and act accordingly!
	
	const ads = await response.json()
	
	const allAdsUl = document.getElementById('all-plant-ads')	
	allAdsUl.innerText = ""
	
	for(const ad of ads){
        //const h3Title = document.createElement('h3')
        const aTitle = document.createElement('a')
        aTitle.innerText = ad.title
        aTitle.setAttribute('href',"/ads/" + ad.id)

        const aImage = document.createElement('a')
        aImage.setAttribute('href',"/ads/" + ad.id)

        const imgImage = document.createElement('img')
        imgImage.setAttribute('src',"/images/"+ad.ImageBundle.coverImagePath)
		imgImage.classList.add("img-thumbnail")
        
        aImage.appendChild(imgImage)
		const liIitle = document.createElement('li')
		const liImage = document.createElement('li')
		liIitle.appendChild(aTitle)
        liImage.appendChild(aImage)
		
	    allAdsUl.appendChild(liIitle)
	    allAdsUl.appendChild(liImage)
		 
        console.log("aTitle: ", aTitle)  		
	}

}