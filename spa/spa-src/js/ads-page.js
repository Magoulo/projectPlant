async function loadAdsPage(){
	console.log("token from global: ", token)

	const response = await fetch("http://localhost:3000/ads")
	
	// TODO: Check status code and act accordingly!
	
	const ads = await response.json()
	//console.log("asd:", ads)
	
	const allAdsUl = document.getElementById('all-plant-ads')
	var fragment = document.createDocumentFragment();
	
	allAdsUl.innerText = ""
	
	for(const ad of ads){

        //const h3Title = document.createElement('h3')

        const aTitle = document.createElement('a')
        aTitle.innerText = ad.title
        aTitle.setAttribute('href',"/ads/" + ad.id)

        const aImage = document.createElement('a')
        aImage.setAttribute('href',"/ads/" + ad.id)

        const imgImage = document.createElement('img')
        imgImage.setAttribute('src',"/web-application/src/presentation-layer/public/images"+ad.ImageBundle.coverImagePath)
        
        aImage.appendChild(imgImage)
		const liIitle = document.createElement('li')
		const liImage = document.createElement('li')
		liIitle.appendChild(aTitle)
        liImage.appendChild(aImage)
		
	    allAdsUl.appendChild(liIitle)
	    allAdsUl.appendChild(liImage)
		
        
        
        console.log("aTitle: ", aTitle)
       // console.log("imagr ref: ", aImage.innerText)
      // console.log("li: ", li)
      //  console.log("a image ", aImage)
		
	}
	//allAdsUl.appendChild(fragment.cloneNode(true))
	
		/*
		document.getElementById('ad-id').innerText = ad.id

		document.getElementById('ad-title').innerText = ad.title

		document.getElementById('ad-latinName').innerText = ad.latinName

		document.getElementById('ad-description').innerText = ad.description*/
	
	
}