async function loadPersonalData(id) {
    console.log("token from global in Ad: ", token)

    const divPersonalData = document.getElementById('personal-data-container')
    divPersonalData.innerText = ""


    const aTitle = document.createElement('a')
    aTitle.innerText = "halloj"
    aTitle.setAttribute('href',"/ads")

    divPersonalData.appendChild(aTitle)
}