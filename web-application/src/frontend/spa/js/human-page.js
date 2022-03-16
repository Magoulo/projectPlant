async function loadHumanPage(id){
	
	const response = await fetch("http://localhost:3000/humans/"+id)
	
	// TODO: Check status code and act accordingly!
	
	const human = await response.json()
	
	document.getElementById('human-id').innerText = human.id
	document.getElementById('human-name').innerText = human.name
	document.getElementById('human-age').innerText = human.age
	
}