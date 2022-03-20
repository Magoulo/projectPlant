async function loadAdPage(id) {
    console.log("token from global in Ad: ", sessionStorage.token)

    const response = await fetch("http://localhost:3000/ads/"+id)

    // TODO: Check status code and act accordingly!

    const ad = await response.json()

    console.log("--------------------"+ad.Ad.title);

    const h3Title = document.createElement('h3')
    h3Title.innerText = ad.Ad.title

    const h5LatinName = document.createElement('h5')
    h5LatinName.innerText = ad.Ad.latinName

    const pDescription = document.createElement('p')
    pDescription.innerText = ad.Ad.description

    const adDiv = document.getElementById('plant-ad-container')
    adDiv.appendChild(h3Title)
    adDiv.appendChild(h5LatinName)
    adDiv.appendChild(pDescription)
}