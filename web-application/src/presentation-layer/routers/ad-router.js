const express = require('express')
const adManager = require('../../business-logic-layer/ad-manager')
const userManager = require('../../business-logic-layer/user-manager')
const router = express.Router()


router.get("/", function (request, response) {
    adManager.getAllAds(function (errors, Ad) {
        const model = {
            errors: errors,
            Ad: Ad,
            session: request.session
        }
        response.render("ads.hbs", model)
    })
})

router.post("/search", function(request, response){
    const searchInput = request.body.searchInput
    
    adManager.getAllAdsByTitle(searchInput, function(errors, Ad){
        const model = {
            errors: errors,
            searchInput: searchInput,
            Ad: Ad, 
            session: request.session
        }
        response.render("ads.hbs", model)
    })
})

router.get("/myAds", function (request, response) {

    adManager.getAllAdsByUserID(request.session.userID, function (errors, ad) {
        const model = {
            errors: errors,
            ad: ad,
            session: request.session
        }
        response.render("myAds.hbs", model)
    })
})

router.post('/adUpdate/:adID/update', function (request, response) {//csrfProtection, function (request, response) {
    const adID = request.params.adID
	const title = request.body.title
    const latinName = request.body.latinname
    const description = request.body.description
   /* const coverImagePath = request.body.coverimagepath
    const firstImagePath = request.body.firstimagepath
    const secondImagePath = request.body.secondimagepath*/

    console.log("adID", adID)
    console.log("title", title)
    console.log("latinName", latinName)
    console.log("description", description)
    /*console.log("coverImagePath", coverImagePath)
    console.log("firstImagePath", firstImagePath)
    console.log("secondImagePath", secondImagePath)*/

    const errors = []//validators.getDonValidationErrors(Name, Description)
    if (errors.length == 0) {
        adManager.updateAdByAdID(adID, title, latinName, description, function (error) {
            if (error) {
                errors.push("Internal server error")
                model = {
                    errors,
					adID,
                    title,
                    latinName,
                    description,
                 //   csrfToken: request.csrfToken()
                }
                response.render('adUpdate.hbs', model)
            }
            else {
                response.redirect('/ads/adUpdate/' + adID)
            }
        })
    }
    else { 
        const model = {
			errors,
			adID,
            title,
            latinName,
            description,
         //   csrfToken: request.csrfToken()
        }
        response.render('adUpdate.hbs', model)
    }
})	

router.get("/adUpdate/:adID", function (request, response) {
    const adID = request.params.adID

    adManager.getAdByAdID(adID, function (errors, ad) {
        const model = {
            errors: errors,
            ad: ad,
            session: request.session
        }
        response.render("adUpdate.hbs", model)
    })
})

router.get("/adDelete/:adID", function (request, response) {
    const adID = request.params.adID

    adManager.getAdByAdID(adID, function (errors, ad) {
        const model = {
            errors: errors,
            ad: ad,
            session: request.session
        }
        response.render("adDelete.hbs", model)
    })
})

router.get('/myAds/:userID', function (request, response) {
    const userID = request.params.userID

    adManager.getAllAdsBidsUsersByUserID(userID, function (errors, ad) {
        var adAccepted = []
        var adPending = []
        var adDeclined = []
        for (index in ad) {
            //    console.log("status!!!!!!!!!!!!!-----------------------------------------: ",ad[index].status)
            if (ad[index].status == "Accepted") {
                //      console.log("Accepted!!!!---------------------------: ")
                adAccepted.push(ad[index])
            }
            if (ad[index].status == "Pending") {
                //      console.log("Pending!!!!---------------------------: ")
                adPending.push(ad[index])
            }
            if (ad[index].status == "Declined") {
                //    console.log("Declined!!!!---------------------------: ")
                adDeclined.push(ad[index])
            }
        }
        /*   console.log("-----------------------------------------------------------------------------")
           console.log("ad: ", ad)
           console.log("adAccepted: ",adAccepted)
           console.log("adPending: ",adPending)
           console.log("adDeclined: ", adDeclined)
           console.log("-----------------------------------------------------------------------------")*/
        const model = {
            errors: errors,
            adAccepted,
            adPending,
            adDeclined
        }
        response.render("myAdBids.hbs", model)
    })
})
router.get("/adCreate", function (request, response) {
    const model = {
        session: request.session
    }
    response.render("adCreate.hbs", model)
})
router.post("/adCreate", function (request, response) {
    response.render("adCreate.hbs")
})

router.get('/:adID', function (request, response) {
    const adID = request.params.adID

    adManager.getAdByAdID(adID, function (errors, ad) {

        userManager.getUserByUserID(ad.userID, function (errors, user) {
            const model = {
                errors: errors,
                ad: ad,
                user: user,
                session: request.session
            }
            response.render("ad.hbs", model)
        })
    })
})

router.get("/ad", function (request, response) {
    const model = {
        session: request.session
    }
    response.render("ad.hbs", model)
})




router.get("/ads", function (request, response) {
    response.render("ads.hbs")
})








module.exports = router