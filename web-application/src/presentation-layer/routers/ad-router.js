const express = require('express')
const path = require('path')

module.exports = function ({ adManager, userManager }) {
    const router = express.Router()

    router.get("/", function (request, response) {

        adManager.getAllAds(function (errors, Ad) {

            // lämnar kvar i koden men tror inte detta behövs samma sak i various router till '/' -> start.hbs
        //    userManager.getUserByAccountID(request.session.userID, function (errors, User) {

                const model = {
                    errors: errors,
                    Ad: Ad,
            //        User: User,
                    session: request.session
                }

                console.log("--------------------------------" + Ad);

                response.render("ads.hbs", model)
       //     })
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

            console.log("--------------------------------" + Ad);

            response.render("ads.hbs", model)
        })
    })

    router.get("/myAds", function (request, response) {

        const userID = request.session.userID
        var model = {}
        var allAds = []
        var allBids = []

        adManager.getAllAdsByUserID(userID, function (errors, Ad) {
  
            if (errors.length !== 0) {
                const model = {
                    errors: errors,
                    Ad: Ad,
                    session: request.session,
                    layout: 'account.hbs'
                }

                response.render("myAds.hbs", model)
            } else {
                allAds = Ad

                model = {
                    Ad: Ad,
                    session: request.session,
                    layout: 'account.hbs'
                }
            }
        })

        adManager.getAllAdsBidsUsersByUserID(userID, function (errors, adOffers) {
            if (errors.length !== 0) {

                const model = {
                    errors: errors,
                    adOffers: adOffers,
                    session: request.session,
                    layout: 'account.hbs'
                }

                response.render("myAds.hbs", model)
            } else {
                allBids = adOffers
                var adAccepted = []
                for (const ad of allAds) {
                    ad.bids = []

                    for (const bid of allBids) {  

                        if (bid.Bids.adID == ad.id && bid.Bids.status == "Pending" && ad.isClosed == false) {            
                            ad.bids.push(bid.Bids)
                        }
                        if(bid.Bids.status == "Accepted" && ad.isClosed == true){
                            adAccepted.push(bid)
                        }
                    }
                }
               /* console.log("allAds: ", allAds)
                console.log("adAccepted", adAccepted)
             
              
                var adDeclined = []

                for (index in adOffers) {
                    if (adOffers[index].status == "Accepted") {
                        adAccepted.push(adOffers[index])
                    }

                    if (adOffers[index].status == "Declined") {
                        adDeclined.push(adOffers[index])
                    }
                }*/

                model.adAccepted = adAccepted
              //  model.adDeclined = adDeclined

                response.render("myAds.hbs", model)
            }
        })
    })

    router.post('/adUpdate/:adID/update', function (request, response) {//csrfProtection, function (request, response) {

        const adID = request.params.adID
        const title = request.body.title
        const latinName = request.body.latinname
        const description = request.body.description

            adManager.updateAdByAdID(adID, title, latinName, description, function (error) {

                if (error.length !== 0) {

                    model = {                
                        adID,
                        title,
                        latinName,
                        description,
                        layout: 'account.hbs'
                        //   csrfToken: request.csrfToken()
                    }

                    response.render('adUpdate.hbs', model)
                } else {
                    response.redirect('/ads/myAds')
                }
            })
        
    })

    router.get("/adUpdate/:adID", function (request, response) {
        const adID = request.params.adID

        adManager.getAdByAdID(adID, function (errors, Ad) {
            const model = {
                errors: errors,
                Ad: Ad,
                session: request.session,
                layout: 'account.hbs'
            }

            response.render("adUpdate.hbs", model)
        })
    })

    router.get("/adDelete/:adID", function (request, response) {
        const adID = request.params.adID

        adManager.getAdByAdID(adID, function (errors, Ad) {
            const model = {
                errors: errors,
                Ad: Ad,
                session: request.session,
                layout: 'account.hbs'
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
                    session: request.session,
                    layout: 'account.hbs'
                }

                response.render("myAds.hbs", model)
            } else {
                console.log("Ad was delete succesfully")
                response.redirect("/ads/myAds")
            }
        })
    })
/* Tror inte denna används!
    router.get('/myAds/:userID', function (request, response) {
        console.log("/myAds/:userID------------------------------------------------------------------------------------------------")
        const userID = request.params.userID

        adManager.getAllAdsBidsUsersByUserID(userID, function (errors, ad) {
            
            var adAccepted = []
            var adPending = []
            var adDeclined = []

            for (index in ad) {
                if (ad[index].status == "Accepted") {
                    adAccepted.push(ad[index])
                }

                if (ad[index].status == "Pending") {
                    adPending.push(ad[index])
                }

                if (ad[index].status == "Declined") {
                    adDeclined.push(ad[index])
                }
            }

            const model = {
                errors: errors,
                adAccepted,
                adPending,
                adDeclined,
                layout: 'account.hbs'
            }

            response.render("myAdBids.hbs", model)
        })
    })*/

    router.get("/adCreate", function (request, response) {

        const model = {
            session: request.session,
            layout: 'account.hbs'
        }

        response.render("adCreate.hbs", model)
    })

    router.post("/adCreate", function (request, response) {

        const coverImageFile = request.files.coverImageFile
        const firstImageFile = request.files.firstImageFile
        const secondImageFile = request.files.secondImageFile

        const images = [coverImageFile, firstImageFile, secondImageFile]
        const ad = { userID: request.session.userID, title: request.body.title, latinName: request.body.latinname, description: request.body.description, isClosed: 0 }
        const errors = []

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

        adManager.createAd(ad, function (error, Ad) {
            if (error.length !== 0) {
                console.log("this here is an error")
                model = {
                    error,
                    session: request.session,
                    layout: 'account.hbs'
                }

                response.render("myAds.hbs", model)
            } else {
                console.log("New ad created with the adID: ", Ad.id)
                const imageBundle = { adID: Ad.id, coverImagePath: coverImageFile.name, firstImagePath: firstImageFile.name, secondImagePath: secondImageFile.name }

                adManager.createImageBundle(imageBundle, function (error, ImageBundle) {
                    if (error.length !== 0) {
                        console.log("error in create Imagebundle")
                    } else {
                        console.log("new imageBundle created with the iD: ", ImageBundle.id)
                        response.redirect("/ads/myAds")
                    }
                })
            }
        })
    })

    router.get('/:adID', function (request, response) {
        const adID = request.params.adID

        adManager.getAdByAdID(adID, function (errors, Ad) {

            userManager.getUserByUserID(Ad.userID, function (errors, User) {

                const model = {
                    errors: errors,
                    Ad: Ad,
                    User: User,
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

    return router
}