async function loadAdsPage(){
	
	const response = await fetch("http://localhost:3000/ads")
	
	// TODO: Check status code and act accordingly!
	
	const ads = await response.json()
	console.log("asd:", ads)
	
	const alladsUl = document.getElementById('all-ads')
	
	alladsUl.innerText = ""
	
	for(const ad of ads){
		console.log("ad: ", ad)
		
		const li = document.createElement('li')
		const anchor = document.createElement('a')

		anchor.innerText = ad.title
		anchor.setAttribute('href', "/ads/"+ad.id)
		
		li.appendChild(anchor)
		
		alladsUl.appendChild(li)
		
	}
	
		/*
		document.getElementById('ad-id').innerText = ad.id

		document.getElementById('ad-title').innerText = ad.title

		document.getElementById('ad-latinName').innerText = ad.latinName

		document.getElementById('ad-description').innerText = ad.description*/
	
	
}