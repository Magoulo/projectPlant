


async function loadHUmansPage(){

	const response = await fetch("http://localhost:3000")
	
	// TODO: Check status code and act accordingly!
	
	const ads = await response.json()
	//console.log("asd:", ads)
	
	const allAdsUl = document.getElementById('all-adsss')
	
	allAdsUl.innerText = ""
	
	for(const ad of ads){
		console.log("ad: ", ad)
		
		const li = document.createElement('li')
		li.innerText = ad.title
		
		allAdsUl.appendChild(li)
		console.log("li: ", li)
		
	}
	
		/*
		document.getElementById('ad-id').innerText = ad.id

		document.getElementById('ad-title').innerText = ad.title

		document.getElementById('ad-latinName').innerText = ad.latinName

		document.getElementById('ad-description').innerText = ad.description*/
}