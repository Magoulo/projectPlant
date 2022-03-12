const express = require('express')
const path = require('path')

module.exports = function ({ adManager, userManager }) {
    const router = express.Router()

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

        adManager.getAllAdsByUserID(userID, function (errors, Ad) {
            console.log("router getAllAdsByUserID", Ad)
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
            console.log("router  adOffers", adOffers)
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

                for (const ad of allAds) {
                    ad.bids = []

                    for (const bid of allBids) {
                        if (bid.adID == ad.adID && bid.status == "Pending" && ad.isClosed == 0) {
                            ad.bids.push(bid)
                        }
                    }
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
                        layout: 'account.hbs'
                        //   csrfToken: request.csrfToken()
                    }

                    response.render('adUpdate.hbs', model)
                } else {
                    response.redirect('/ads/adUpdate/' + adID)
                }
            })
        } else {
            const model = {
                errors,
                adID,
                title,
                latinName,
                description,
                layout: 'account.hbs'
                //   csrfToken: request.csrfToken()
            }

            response.render('adUpdate.hbs', model)
        }
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

    router.get('/myAds/:userID', function (request, response) {
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
    })

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

        adManager.createAd(ad, function (error, adID) {
            if (error) {
                model = {
                    error,
                    session: request.session,
                    layout: 'account.hbs'
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