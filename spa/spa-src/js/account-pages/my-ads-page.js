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
    aCreate.classList.add("btn")
    aCreate.classList.add("btn-primary")
    aCreate.classList.add("m-3")
    aCreate.setAttribute('href',"/ads/adCreate")

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
            liIitle.appendChild(h3Title)

            //Ad Image
            const imgImage = document.createElement('img')
            imgImage.setAttribute('src', "/images/" + ad.ImageBundle.coverImagePath)  
            const liImage = document.createElement('li')
            liImage.appendChild(imgImage)

            //Append title and Imge to Ul
            myAdsUl.appendChild(liIitle)
            myAdsUl.appendChild(liImage)

            //update button
            const aUpdate = document.createElement('a')
            aUpdate.innerText = "Update"
            aUpdate.classList.add("btn")
            aUpdate.classList.add("btn-primary")
            aUpdate.classList.add("m-2")
            aUpdate.setAttribute('href',"/ads/adUpdate/" + ad.id+ "/update")
            console.log("anchor Update: ", aUpdate)

            //delete button
            const aDelete = document.createElement('a')
            aDelete.innerText = "Delete"
            aDelete.classList.add("btn")
            aDelete.classList.add("btn-primary")
            aDelete.classList.add("m-2")
            aDelete.setAttribute('href',"/ads/adDelete/" + ad.id + "/delete")

            //Append Update and Delete buttons to Ul
            myAdsUl.appendChild(aUpdate)
            myAdsUl.appendChild(aDelete)

            //Append Ul to Div
            myAdsDiv.appendChild(myAdsUl)

        }
    }

}
