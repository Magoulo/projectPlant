async function loadAdsPage() {
    console.log("-------------------------------------------Ads");

    const response = await fetch("http://localhost:3000/ads")

    const statusCode = response.status
    const ads = await response.json()

    if (statusCode == 200) {
        console.log("-------------------------------------------"+ { ads: "title" });

        const allAdsUl = document.getElementById('all-ads')
        allAdsUl.innerText = ""

        for (const ad of ads) {
            console.log("-------------------------------------------"+ad);

            const li = document.createElement('li')

            const anchor = document.createElement('a')
            anchor.innerText = ad.id
            anchor.setAttribute('href', "/ads/" + ad.id)

            li.appendChild(anchor)

            allAdsUl.appendChild(li)

        }




    }


    // TODO: Check status code and act accordingly!





}