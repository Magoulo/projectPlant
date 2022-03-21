async function loadAdPage(id) {
    console.log("token from global in Ad: ", sessionStorage.token)

    function timeOut(url) {
        
        hideCurrentPage()
        setTimeout(function () {
            document.getElementById("loader-spinner").classList.add('current-page')
        }, 1000)

        document.getElementById("loader-spinner").classList.remove('current-page')
        showPage(url)
    }

    const response = await fetch("http://localhost:3000/ads/" + id)

    timeOut("/ads/" + id)

    // TODO: Check status code and act accordingly!

    const ad = await response.json()

    //Get elements
    const adDiv = document.getElementById('plant-ad-container')
    const h3Title = document.createElement('h3')
    const h5LatinName = document.createElement('h5')
    const pDescription = document.createElement('p')
    const imgImageCoverImage = document.createElement('img')
    const imgImageFirstImage = document.createElement('img')
    const imgImageSecondImage = document.createElement('img')

    //Set attributes of elements
    adDiv.innerText = ""
    h3Title.innerText = ad.Ad.title
    h5LatinName.innerText = ad.Ad.latinName
    pDescription.innerText = ad.Ad.description

    imgImageCoverImage.setAttribute('src', "/images/" + ad.Ad.ImageBundle.coverImagePath)
    imgImageCoverImage.classList.add("img-thumbnail")

    imgImageFirstImage.setAttribute('src', "/images/" + ad.Ad.ImageBundle.firstImagePath)
    imgImageFirstImage.classList.add("img-thumbnail")

    imgImageSecondImage.setAttribute('src', "/images/" + ad.Ad.ImageBundle.secondImagePath)
    imgImageSecondImage.classList.add("img-thumbnail")

    //Append elements to adDiv
    adDiv.appendChild(h3Title)
    adDiv.appendChild(h5LatinName)
    adDiv.appendChild(imgImageCoverImage)
    adDiv.appendChild(imgImageFirstImage)
    adDiv.appendChild(imgImageSecondImage)
    adDiv.appendChild(pDescription)
}