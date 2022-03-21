async function loadMyAdsPage() {
    console.log("token from global: ", sessionStorage.token)

    const response = await fetch("http://localhost:3000/ads/myAds", {
        method: 'GET',
        headers: new Headers({
            'Authorization': "bearer " + sessionStorage.token,
        }),
    })

    // TODO: Check status code and act accordingly!

    const myAds = await response.json()
    console.log("My Ads: ", myAds)

    //My Ads Div
    const myAdsDiv = document.getElementById('my-ads-container')
    myAdsDiv.innerText = ""

    //Create button
    const aCreate = document.createElement("a")
    aCreate.innerText = "Create Ad"
    aCreate.classList.add("btn","btn-primary","m-3")
    aCreate.setAttribute('href', "/ads/adCreate")

    //Eventlistener for create button
    aCreate.addEventListener('click', function (event) {
        event.preventDefault()

        const url = event.target.getAttribute("href")
        hideCurrentPage()
        showPage(url)
        setPushState(url)
    })

    //Append Create button to Div
    myAdsDiv.appendChild(aCreate)

    for (const ads of myAds) {
        for (const ad of ads) {

            //Ul
            const myAdsUl = document.createElement('ul')

            //Ad title
            const h3Title = document.createElement('h3')
            h3Title.innerText = ad.title
            const liIitle = document.createElement('li')
            liIitle.classList.add("hidden-list")
            liIitle.appendChild(h3Title)

            //Ad Image
            const imgImage = document.createElement('img')
            imgImage.setAttribute('src', "/images/" + ad.ImageBundle.coverImagePath)
            imgImage.classList.add("img-thumbnail")
            const liImage = document.createElement('li')
            liImage.classList.add("hidden-list")
            liImage.appendChild(imgImage)

            //Append title and Image to Ul
            myAdsUl.appendChild(liIitle)
            myAdsUl.appendChild(liImage)

            //update button
            const aUpdate = document.createElement('a')
            aUpdate.innerText = "Update"
            aUpdate.classList.add("btn","btn-primary","m-2")
            aUpdate.setAttribute('href', "/ads/adUpdate/" + ad.id + "/update")

            //Eventlistener for update button
            aUpdate.addEventListener('click', function (event) {
                event.preventDefault()

                const url = event.target.getAttribute("href")
                hideCurrentPage()
                showPage(url)
                setPushState(url)
            })

            //delete button
            const aDelete = document.createElement('a')
            aDelete.innerText = "Delete"
            aDelete.classList.add("btn","btn-primary","m-2")
            aDelete.setAttribute('href', "/ads/adDelete/" + ad.id + "/delete")

            //Eventlistener for delete button
            aDelete.addEventListener('click', function (event) {
                event.preventDefault()

                const url = event.target.getAttribute("href")
                hideCurrentPage()
                showPage(url)
                setPushState(url)
            })

            //Append Update and Delete buttons to Ul
            myAdsUl.appendChild(aUpdate)
            myAdsUl.appendChild(aDelete)

            //Append Ul to Div
            myAdsDiv.appendChild(myAdsUl)

            //EventListeners for update and delete buttons
            aUpdate.addEventListener('click', function (event) {
                event.preventDefault()

                const url = aUpdate.getAttribute("href")
                hideCurrentPage()
                showPage(url)
                setPushState(url)
            })
            aDelete.addEventListener('click', function (event) {
                event.preventDefault()

                const url = aDelete.getAttribute("href")
                hideCurrentPage()
                showPage(url)
                setPushState(url)
            })
        }
    }

}
