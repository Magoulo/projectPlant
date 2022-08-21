const express = require('express')
const path = require('path')

module.exports = function ({ adManager, userManager }) {
    const router = express.Router()

    router.get("/", function (request, response) {

        adManager.getAllAds(function (error, Ad) {

            if (error.length !== 0) {
                const model = {
                    errors: error,
                }
                response.render("ads.hbs", model)
            } else {
                const model = {
                    errors: error,
                    Ad: Ad,
                }

                response.render("ads.hbs", model)
            }
        })
    })

    router.post("/search", function (request, response) {
        const searchInput = request.body.searchInput

        adManager.getAllAdsByTitleOrLatinName(searchInput, function (errors, Ad) {

            const model = {
                errors: errors,
                searchInput: searchInput,
                Ad: Ad,
            }

            response.render("ads.hbs", model)
        })
    })

    router.post('/adUpdate/:adID/update', function (request, response) {

        const adID = request.params.adID
        const title = request.body.title
        const latinName = request.body.latinname
        const description = request.body.description
        const adUpdateInput = { id: adID, title: title, latinName: latinName, description: description }
        const sessionID = request.session.userID

        adManager.userHasAdAccess(adID, sessionID, function (errors, userHasAcces) {
            if (errors.length !== 0) {
                model = {
                    Ad: Ad,
                    errors,
                    layout: 'account.hbs',
                }

                response.render('adUpdate.hbs', model)
            } else {
                if (!userHasAcces) {
                    response.render("notAuthorized.hbs")
                } else {
                    adManager.updateAdByAdID(adUpdateInput, function (errors) {

                        if (errors.length !== 0) {
                            // make a dict of the errors?
                            const titleErrors = errors[0]
                            const latinNameErrors = errors[1]
                            const descriptionErrors = errors[2]

                            model = {
                                Ad: Ad,
                                titleErrors,
                                latinNameErrors,
                                descriptionErrors,
                                layout: 'account.hbs',
                            }

                            response.render('adUpdate.hbs', model)
                        } else {
                            response.redirect('/my-account/ads',)
                        }
                    })
                }
            }
        })
    })

    router.get("/adUpdate/:adID", function (request, response) {
        const adID = request.params.adID

        adManager.getAdByAdID(adID, function (errors, Ad) {
            const model = {
                errors: errors,
                Ad: Ad,
                layout: 'account.hbs',
            }

            response.render("adUpdate.hbs", model)
        })
    })

    router.get("/adDelete/:adID", function (request, response) {
        const adID = request.params.adID


        // if(loggedIn)?

        adManager.getAdByAdID(adID, function (errors, Ad) {
            const model = {
                errors: errors,
                Ad: Ad,
                layout: 'account.hbs',
            }
            response.render("adDelete.hbs", model)
        })
    })


    router.post("/adDelete/:adID/delete", function (request, response) {

        const adID = request.params.adID
        const sessionID = request.session.userID

        adManager.userHasAdAccess(adID, sessionID, function (errors, userHasAcces) {
            if (errors.length !== 0) {
                model = {
                    Ad: Ad,
                    errors,
                    layout: 'account.hbs',
                }

                response.render('adUpdate.hbs', model)
            } else {
                if (!userHasAcces) {
                    response.render("notAuthorized.hbs")
                } else {
                    adManager.deleteAd(adID, function (errors) {
                        if (errors.length !== 0) {
                            const model = {
                                errors: errors,
                                layout: 'account.hbs',
                            }

                            response.render("notAuthorized.hbs", model)
                        } else {
                            response.redirect("/my-account/ads")
                        }
                    })
                }
            }
        })
    })


    router.get("/adCreate", function (request, response) {

        const model = {
            layout: 'account.hbs',
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
                    layout: 'account.hbs',
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
                        layout: 'account.hbs',
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
                                layout: 'account.hbs',
                            }

                            response.render("adCreate.hbs", model)
                        } else {
                            response.redirect("/my-account/ads")
                        }
                    })
                }
            }
        })
    })


    router.get('/:adID', function (request, response) {
        const adID = request.params.adID

        adManager.getAdByAdID(adID, function (errors, Ad) {

            const model = {
                errors: errors,
                Ad: Ad,
            }

            response.render("ad.hbs", model)
        })
    })

    router.get("/ads", function (request, response) {
        response.render("ads.hbs")
    })

    return router
}