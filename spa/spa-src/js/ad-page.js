async function loadAdPage(id) {

    const response = await fetch("http://localhost:3000/ads/" + id)
    const statusCode = response.status
    const adDiv = document.getElementById('plant-ad-container')

    if (statusCode == 200) {

        const ad = await response.json()

        //Create elements
        const h3Title = document.createElement('h3')
        const h5LatinName = document.createElement('h5')
        const pDescription = document.createElement('p')

        const imgImageCoverImage = document.createElement('img')
        const imgImageFirstImage = document.createElement('img')
        const imgImageSecondImage = document.createElement('img')

        const liImageCoverImage = document.createElement('li')
        const liImageFirstImage = document.createElement('li')
        const liImageSecondImage = document.createElement('li')

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

        //adding class to li
        liImageCoverImage.classList.add("hidden-list")
        liImageFirstImage.classList.add("hidden-list")
        liImageSecondImage.classList.add("hidden-list")

        //Append elements to parent

        liImageCoverImage.appendChild(imgImageCoverImage)
        liImageFirstImage.appendChild(imgImageFirstImage)
        liImageSecondImage.appendChild(imgImageSecondImage)

        adDiv.appendChild(h3Title)
        adDiv.appendChild(h5LatinName)
        adDiv.appendChild(pDescription)
        adDiv.appendChild(liImageCoverImage)
        adDiv.appendChild(liImageFirstImage)
        adDiv.appendChild(liImageSecondImage)
    }

    if (statusCode == 500) {

        const pError = document.createElement('p')
        pError.innerText = response.statusText

        adDiv.appendChild(pError)
    }
}