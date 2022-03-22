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

    router.post('/adUpdate/:adID/update', function (request, response) {

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


    router.get("/adCreate", function (request, response) {

        const model = {
            session: request.session,
            layout: 'account.hbs'
        }

        response.render("adCreate.hbs", model)
    })


    router.post("/adCreate", function (request, response) {

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
                    layout: 'account.hbs'
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
                    imageErrors.push("Muset choose all three files below")
                }


                if (imageErrors.length > 0) {

                    model = {
                        imageErrors,
                        Ad: newAd,
                        session: request.session,
                        layout: 'account.hbs'
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
                                response.render('adCreate.hbs', { msgError: imageUploadError })
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
                                layout: 'account.hbs'
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


    router.get('/:adID', function (request, response) {
        const adID = request.params.adID

        adManager.getAdByAdID(adID, function (errors, Ad) {
            console.log("Ad-----------------------------------",Ad)
            console.log("Ad.ImageBundle.coverImagePath: ", Ad.ImageBundle.coverImagePath)

            const model = {
                errors: errors,
                Ad: Ad,
                session: request.session
            }

            response.render("ad.hbs", model)
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