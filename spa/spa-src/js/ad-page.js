async function loadAdPage(id) {
    console.log("token from global in Ad: ", sessionStorage.token)

    const response = await fetch("http://localhost:3000/ads/"+id)

    // TODO: Check status code and act accordingly!

    const ad = await response.json()

    console.log("--------------------"+ad.Ad.ImageBundle.coverImagePath);

    const h3Title = document.createElement('h3')
    h3Title.innerText = ad.Ad.title

    const h5LatinName = document.createElement('h5')
    h5LatinName.innerText = ad.Ad.latinName

    const pDescription = document.createElement('p')
    pDescription.innerText = ad.Ad.description

    const imgImageCoverImage = document.createElement('img')
    imgImageCoverImage.setAttribute('src',"/images/"+ad.Ad.ImageBundle.coverImagePath)
    imgImageCoverImage.classList.add("img-thumbnail")

    const imgImageFirstImage = document.createElement('img')
    imgImageFirstImage.setAttribute('src',"/images/"+ad.Ad.ImageBundle.firstImagePath)
    imgImageFirstImage.classList.add("img-thumbnail")

    const imgImageSecondImage = document.createElement('img')
    imgImageSecondImage.setAttribute('src',"/images/"+ad.Ad.ImageBundle.secondImagePath)
    imgImageSecondImage.classList.add("img-thumbnail")

    const adDiv = document.getElementById('plant-ad-container')
    adDiv.appendChild(h3Title)
    adDiv.appendChild(h5LatinName)
    adDiv.appendChild(imgImageCoverImage)
    adDiv.appendChild(imgImageFirstImage)
    adDiv.appendChild(imgImageSecondImage)

    adDiv.appendChild(pDescription)
}