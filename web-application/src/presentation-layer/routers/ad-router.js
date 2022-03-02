const express = require('express')
const adManager = require('../../business-logic-layer/ad-manager')
const userManager = require('../../business-logic-layer/user-manager')
const router = express.Router()
const path = require('path')

router.get("/", function (request, response) {

    adManager.getAllAds(function (errors, Ad) {

        userManager.getUserByAccountID(request.session.userID, function (errors, User) {

            const model = {
                errors: errors,
                Ad: Ad,
                User: User,
                session: request.session
            }
            response.render("ads.hbs", model)
        })
    })
})

router.post("/search", function (request, response) {
    const searchInput = request.body.searchInput

    adManager.getAllAdsByTitleOrLatinName(searchInput, function (errors, Ad) {
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
    const userID = request.session.userID
    var model = {}
    var allAds = []
    var allBids = []

    adManager.getAllAdsByUserID(userID, function (errors, ad) {
        if (errors.length !== 0) {
            const model = {
                errors: errors,
                ad: ad,
                session: request.session
            }
            response.render("myAds.hbs", model)
        } else {
            allAds = ad
            model = {
                ad: ad,
                session: request.session
            }
            console.log("heina?")
        }
    })
    adManager.getAllAdsBidsUsersByUserID(userID, function (errors, adOffers) {
        if (errors.length !== 0) {
            const model = {
                errors: errors,
                adOffers: adOffers,
                session: request.session
            }
            response.render("myAds.hbs", model)
        } else {
            allBids = adOffers
            console.log("allBids: ", allBids)


            for (const ad of allAds) {
                ad.bids = []
                for (const bid of allBids) {
                    if (bid.adID == ad.adID && bid.status == "Pending" ) {
                        ad.bids.push(bid)
                    }
                }
                console.log("ad: ", ad)
            }

            var adAccepted = []
            var adDeclined = []
            for (index in adOffers) {
                if (adOffers[index].status == "Accepted") {
                    adAccepted.push(adOffers[index])
                }
                if (adOffers[index].status == "Declined") {
                    adDeclined.push(adOffers[index])
                }
            }
            model.adAccepted = adAccepted
            model.adDeclined = adDeclined

            response.render("myAds.hbs", model)
        }
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

                //Update ImageBundle
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

router.post("/adDelete/:adID/delete", function (request, response) {
    const adID = request.params.adID

    adManager.deleteAd(adID, function (errors) {
        if (errors.length !== 0) {
            const model = {
                errors: errors,
                session: request.session
            }
            response.render("myAds.hbs", model)
        } else {
            console.log("Ad was delete succesfully")
            response.redirect("/ads/myAds")
        }
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

    const ad = { userID: request.session.userID, title: request.body.title, latinName: request.body.latinname, description: request.body.description, isClosed: 0 }
    const errors = []

    /*const coverImagePath = "https://www.thespruce.com/thmb/_6OfTexQcyd-3aW8Z1O2y78sc-Q=/2048x1545/filters:fill(auto,1)/snake-plant-care-overview-1902772-04-d3990a1d0e1d4202a824e929abb12fc1-349b52d646f04f31962707a703b94298.jpeg"
    const firstImagePath = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3sNBXTUiieX57OSxUWNAgdWNSwmz6xKWWkD9rzknwLh95ogckDEdJ_EqLYR-0VEkHfiE&usqp=CAU"
    const secondImagePath = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMLD3FCy2W6ETP4Jb1JdBGrrJ3ttuxmNenJQ&usqp=CAU"*/

    const coverImageFile = request.files.coverImageFile
    const firstImageFile = request.files.firstImageFile
    const secondImageFile = request.files.secondImageFile

    const images = [coverImageFile, firstImageFile, secondImageFile]
    console.log("images: ", images)

    for (var i = 0; i < images.length; i++) {
        const uploadPath = path.resolve(__dirname, '../public/images/', images[i].name)

        images[i].mv(uploadPath, function (error) {
            if (error) {
                console.log("Error in uploading pathway")
                errors.push("couldn't upload picture")
                response.render('adCreate.hbs', errors)
            } else {
                console.log("file uploaded successfully")
            }
        })
    }

    adManager.createAd(ad, function (error, adID) {
        if (error) {
            model = {
                error,
                session: request.session
            }
            response.render("myAds.hbs", model)
        } else {
            console.log("New ad created with the adID: ", adID)
            const imageBundle = { adID: adID, coverImagePath: coverImageFile.name, firstImagePath: firstImageFile.name, secondImagePath: secondImageFile.name }

            adManager.createImageBundle(imageBundle, function (error, ibID) {
                if (error) {
                    console.log("error in create Imagebundle")
                } else {
                    console.log("new imageBundle created with the iD: ", ibID)
                    response.redirect("/ads/myAds")
                }
            })
        }
    })
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