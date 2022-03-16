async function loadHumansPage(){
	
	const response = await fetch("http://localhost:3000/humans")
	
	// TODO: Check status code and act accordingly!
	
	const humans = await response.json()
	
	const allHumansUl = document.getElementById('all-humans')
	allHumansUl.innerText = ""
	
	for(const human of humans){
		
		const li = document.createElement('li')
		
		const anchor = document.createElement('a')
		anchor.innerText = human.name
		anchor.setAttribute('href', "/humans/"+human.id)
		
		li.appendChild(anchor)
		
		allHumansUl.appendChild(li)
		
	}
	
}