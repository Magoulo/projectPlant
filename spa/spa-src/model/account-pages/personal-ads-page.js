async function loadMyAdsPage() {

    const response = await fetch("http://localhost:3000/my-account/ads", {
        method: 'GET',
        headers: new Headers({
            'Authorization': "Bearer " + sessionStorage.accessToken,
        }),
    })
    const statusCode = response.status

    if (statusCode == 200) {

        const myAds = await response.json()
     
        //My Ads Div
        const myAdsDiv = document.getElementById('personal-ads-container')
        myAdsDiv.innerText = ""

        //Create button
        const aCreate = document.createElement("a")
        aCreate.innerText = "Create Ad"
        aCreate.classList.add("btn", "btn-primary", "m-3")
        aCreate.setAttribute('href', "/ads/ad-create")

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
                imgImage.setAttribute('src', "/images/" + ad.ImageBundle.coverImageName)
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
                aUpdate.classList.add("btn", "btn-primary", "m-2")
                aUpdate.setAttribute('href', "/ads/ad-details/" + ad.id)

                //delete button
                const aDelete = document.createElement('a')
                aDelete.innerText = "Delete"
                aDelete.classList.add("btn", "btn-primary", "m-2")
                aDelete.setAttribute('href', "/ads/confirm-delete/" + ad.id)

                //Append Update and Delete buttons to Ul
                myAdsUl.appendChild(aUpdate)
                myAdsUl.appendChild(aDelete)

                //Append Ul to Div
                myAdsDiv.appendChild(myAdsUl)

                //EventListener for update buttons
                aUpdate.addEventListener('click', function (event) {
                    event.preventDefault()

                    const url = aUpdate.getAttribute("href")
                    hideCurrentPage()
                    showPage(url)
                    setPushState(url)
                })

                //EventListener for delete button
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
    else if (statusCode == 400 || statusCode == 401) {
        response.json().then(data => {

            document.getElementById("personal-ads-error").innerText = data[0]

        })

    }
}
