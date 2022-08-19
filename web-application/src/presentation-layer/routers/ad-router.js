const express = require('express')
const path = require('path')
const csrf = require('csurf')
const csrfProtection = csrf()

module.exports = function ({ adManager, userManager }) {
    const router = express.Router()

    router.get("/", csrfProtection, function (request, response) {

        adManager.getAllAds(function (error, Ad) {

            if (error.length !== 0) {
                const model = {
                    errors: error,
                    csrfToken: request.csrfToken()
                }
                response.render("ads.hbs", model)
            } else {
                const model = {
                    errors: error,
                    Ad: Ad,
                    session: request.session,
                    csrfToken: request.csrfToken()
                }

                response.render("ads.hbs", model)
            }
        })
    })

    router.post("/search", csrfProtection, function (request, response) {
        const searchInput = request.body.searchInput

        adManager.getAllAdsByTitleOrLatinName(searchInput, function (errors, Ad) {

            const model = {
                errors: errors,
                searchInput: searchInput,
                Ad: Ad,
                session: request.session,
                csrfToken: request.csrfToken()
            }

            response.render("ads.hbs", model)
        })
    })

    router.get("/myAds", csrfProtection, function (request, response) {

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
                    layout: 'account.hbs',
                    csrfToken: request.csrfToken()
                }

                response.render("myAds.hbs", model)
            } else {

                allAds = Ad

                model = {
                    Ad: Ad,
                    session: request.session,
                    layout: 'account.hbs',
                    csrfToken: request.csrfToken()
                }
            }
        })

        adManager.getAllAdsBidsUsersByUserID(userID, function (errors, adOffers) {
            if (errors.length !== 0) {

                const model = {
                    errors: errors,
                    adOffers: adOffers,
                    session: request.session,
                    layout: 'account.hbs',
                    csrfToken: request.csrfToken()
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
                        if (bid.Bids.status == "Accepted" && ad.isClosed == true) {
                            adAccepted.push(bid)
                        }
                    }
                }

                model.adAccepted = adAccepted

                response.render("myAds.hbs", model)
            }
        })
    })

    router.post('/adUpdate/:adID/update', csrfProtection, function (request, response) {

        const adID = request.params.adID
        const title = request.body.title
        const latinName = request.body.latinname
        const description = request.body.description

        const Ad = { id: adID, title: title, latinName: latinName, description: description }

        adManager.updateAdByAdID(Ad, function (errors) {

            if (errors.length !== 0) {

                const titleErrors = errors[0]
                const latinNameErrors = errors[1]
                const descriptionErrors = errors[2]

                model = {
                    Ad: Ad,
                    titleErrors,
                    latinNameErrors,
                    descriptionErrors,
                    session: request.session,
                    layout: 'account.hbs',
                    csrfToken: request.csrfToken()
                }

                response.render('adUpdate.hbs', model)
            } else {
                response.redirect('/ads/myAds',)
            }
        })
    })

    router.get("/adUpdate/:adID", csrfProtection, function (request, response) {
        const adID = request.params.adID

        adManager.getAdByAdID(adID, function (errors, Ad) {
            const model = {
                errors: errors,
                Ad: Ad,
                session: request.session,
                layout: 'account.hbs',
                csrfToken: request.csrfToken()
            }

            response.render("adUpdate.hbs", model)
        })
    })

    router.get("/adDelete/:adID", csrfProtection, function (request, response) {
        const adID = request.params.adID

        adManager.getAdByAdID(adID, function (errors, Ad) {
            const model = {
                errors: errors,
                Ad: Ad,
                session: request.session,
                layout: 'account.hbs',
                csrfToken: request.csrfToken()
            }
            response.render("adDelete.hbs", model)
        })
    })


    router.post("/adDelete/:adID/delete", csrfProtection, function (request, response) {
        const adID = request.params.adID

        adManager.getAdByAdID(adID, function (errors, Ad) {
            if (errors.length !== 0) {
                const model = {
                    errors: errors,
                    session: request.session,
                    layout: 'account.hbs',
                    csrfToken: request.csrfToken()
                }
                response.render("myAds.hbs", model)
            } else {

                var ids = {adUserID: Ad.userID, sessionUserID: request.session.userID}
                if (adManager.isUserAuthenticated(ids)) {

                    adManager.deleteAd(adID, function (errors) {
                        if (errors.length !== 0) {
                            const model = {
                                errors: errors,
                                session: request.session,
                                layout: 'account.hbs',
                                csrfToken: request.csrfToken()
                            }

                            response.render("myAds.hbs", model)
                        } else {
                            response.redirect("/ads/myAds")
                        }
                    })
               
                } else {
                     //Ändra till not authenticated sidan???--------------------------------------------------------------------------------
                    response.render("myAds.hbs")
                }
            }
        })
    })


    router.get("/adCreate", csrfProtection, function (request, response) {

        const model = {
            session: request.session,
            layout: 'account.hbs',
            csrfToken: request.csrfToken()
        }

        response.render("adCreate.hbs", model)
    })


    router.post("/adCreate", csrfProtection, function (request, response) {

        const newAd = { userID: request.session.userID, title: request.body.title, latinName: request.body.latinname, description: request.body.description, isClosed: 0 }

        adManager.createAd(newAd, function (errors, Ad) {

            if (errors.length !== 0) {

                const titleErrors = errors[0]
                const latinNameErrors = errors[1]
                const descriptionErrors = errors[2]

                model = {
                    titleErrors,
                    latinNameErrors,
                    descriptionErrors,
                    Ad: newAd,
                    session: request.session,
                    layout: 'account.hbs',
                    csrfToken: request.csrfToken()
                }

                response.render("adCreate.hbs", model)

            } else {

                const imageErrors = []
                var coverImageFile = null
                var firstImageFile = null
                var secondImageFile = null

                if (request.files) {
                    coverImageFile = request.files.coverImageFile
                    firstImageFile = request.files.firstImageFile
                    secondImageFile = request.files.secondImageFile
                } else {
                    imageErrors.push("Must choose all three files below")
                }

                if (imageErrors.length > 0) {

                    model = {
                        imageErrors,
                        Ad: newAd,
                        session: request.session,
                        layout: 'account.hbs',
                        csrfToken: request.csrfToken()
                    }

                    response.render("adCreate.hbs", model)

                } else {
                    const images = [coverImageFile, firstImageFile, secondImageFile]
                    const imageUploadError = []

                    for (var i = 0; i < images.length; i++) {
                        const uploadPath = path.resolve(__dirname, '../public/images/', images[i].name)

                        images[i].mv(uploadPath, function (error) {

                            if (error) {
                                imageUploadError.push("couldn't upload picture")

                                const model = {
                                    msgError: imageUploadError,
                                    csrfToken: request.csrfToken()
                                }

                                response.render('adCreate.hbs', model)
                            } else {
                                console.log("file uploaded successfully")
                            }
                        })
                    }

                    const imageBundle = { adID: Ad.id, coverImagePath: coverImageFile.name, firstImagePath: firstImageFile.name, secondImagePath: secondImageFile.name }

                    adManager.createImageBundle(imageBundle, function (error, ImageBundle) {

                        if (error.length !== 0) {

                            imageUploadError.push("Something went wrong when saving images for ad" + newAd.title + ".")

                            model = {
                                msgError: imageUploadError,
                                Ad: newAd,
                                session: request.session,
                                layout: 'account.hbs',
                                csrfToken: request.csrfToken()
                            }

                            response.render("adCreate.hbs", model)
                        } else {
                            response.redirect("/ads/myAds")
                        }
                    })
                }
            }
        })
    })


    router.get('/:adID', csrfProtection, function (request, response) {
        const adID = request.params.adID

        adManager.getAdByAdID(adID, function (errors, Ad) {

            const model = {
                errors: errors,
                Ad: Ad,
                session: request.session,
                csrfToken: request.csrfToken()
            }

            response.render("ad.hbs", model)
        })
    })

    router.get("/ads", csrfProtection, function (request, response) {
        response.render("ads.hbs", { csrfToken: request.csrfToken() })
    })

    return router
}