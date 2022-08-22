const express = require('express')
const path = require('path')

module.exports = function ({ adManager }) {
    const router = express.Router()

    router.get("/", function (request, response) {
        adManager.getAllAds(function (errors, Ad) {

            if (errors.length !== 0) {
                const model = {
                    errors: errors,
                }
                response.render("ads.hbs", model)
            } else {
                const model = {
                    errors: errors,
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

    //CREATE AD------------------------------------------------------------------------------------
    router.get("/ad-create", function (request, response) {
        const model = {
            layout: 'account.hbs',
        }

        response.render("adCreateForm.hbs", model)
    })

    router.post("/ad-create", function (request, response) {
        const session = request.session

        if (!adManager.userIsLoggedIn(session)) {
            response.render("notAuthorized.hbs")
        } else {
            const newAd = { userID: session.userID, title: request.body.title, latinName: request.body.latinname, description: request.body.description, isClosed: 0 }

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

                    response.render("adCreateForm.hbs", model)

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

                        response.render("adCreateForm.hbs", model)

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

                                    response.render('adCreateForm.hbs', model)
                                } else {
                                    console.log("file uploaded successfully")
                                }
                            })
                        }

                        const imageBundle = { adID: Ad.id, coverImagePath: coverImageFile.name, firstImagePath: firstImageFile.name, secondImagePath: secondImageFile.name }

                        adManager.createImageBundle(imageBundle, function (errors, ImageBundle) {

                            if (errors.length !== 0) {

                                imageUploadError.push("Something went wrong when saving images for ad" + newAd.title + ".")

                                model = {
                                    msgError: imageUploadError,
                                    Ad: newAd,
                                    layout: 'account.hbs',
                                }

                                response.render("adCreateForm.hbs", model)
                            } else {
                                response.redirect("/my-account/ads")
                            }
                        })
                    }
                }
            })
        }

    })

    //UPDATE AD------------------------------------------------------------------------------------
    router.get("/ad-details/:adID", function (request, response) {
        const adID = request.params.adID
        const sessionID = request.session.userID

        adManager.userHasAccess(adID, sessionID, function (errors, userHasAccess) {
            if (errors.length !== 0) {
                model = {
                    errors,
                    layout: 'account.hbs',
                }

                response.render('adUpdateForm.hbs', model)
            } else {
                if (!userHasAccess) {
                    response.render("notAuthorized.hbs")
                } else {
                    adManager.getAdByAdID(adID, function (errors, Ad) {
                        const model = {
                            errors: errors,
                            Ad: Ad,
                            layout: 'account.hbs',
                        }

                        response.render("adUpdateForm.hbs", model)
                    })
                }
            }
        })
    })

    router.post('/ad-details/:adID/update', function (request, response) {

        const adID = request.params.adID
        const title = request.body.title
        const latinName = request.body.latinname
        const description = request.body.description
        const Ad = { id: adID, title: title, latinName: latinName, description: description }
        const sessionID = request.session.userID

        adManager.userHasAccess(adID, sessionID, function (errors, userHasAccess) {
            if (errors.length !== 0) {
                model = {
                    errors,
                    layout: 'account.hbs',
                }

                response.render('adUpdateForm.hbs', model)
            } else {
                if (!userHasAccess) {
                    response.render("notAuthorized.hbs")
                } else {
                    adManager.updateAdByAdID(Ad, function (errors) {

                        if (errors.length !== 0) {
                            const titleErrors = errors[0]
                            const latinNameErrors = errors[1]
                            const descriptionErrors = errors[2]

                            model = {
                                Ad,
                                titleErrors,
                                latinNameErrors,
                                descriptionErrors,
                                layout: 'account.hbs',
                            }

                            response.render('adUpdateForm.hbs', model)
                        } else {
                            response.redirect('/my-account/ads',)
                        }
                    })
                }
            }
        })
    })

    //DELETE AD------------------------------------------------------------------------------------
    router.get("/confirm-delete/:adID", function (request, response) {
        const adID = request.params.adID
        const sessionID = request.session.userID

        adManager.userHasAccess(adID, sessionID, function (errors, userHasAccess) {
            if (errors.length !== 0) {
                model = {
                    Ad: Ad,
                    errors,
                    layout: 'account.hbs',
                }

                response.render('adUpdateForm.hbs', model)
            } else {
                if (!userHasAccess) {
                    response.render("notAuthorized.hbs")
                } else {
                    adManager.getAdByAdID(adID, function (errors, Ad) {
                        const model = {
                            errors: errors,
                            Ad: Ad,
                            layout: 'account.hbs',
                        }
                        response.render("adDeleteForm.hbs", model)
                    })
                }
            }
        })
    })

    router.post("/confirm-delete/:adID/delete", function (request, response) {
        const adID = request.params.adID
        const sessionID = request.session.userID

        adManager.userHasAccess(adID, sessionID, function (errors, userHasAccess) {
            if (errors.length !== 0) {
                model = {
                    Ad: Ad,
                    errors,
                    layout: 'account.hbs',
                }

                response.render('adUpdateForm.hbs', model)
            } else {
                if (!userHasAccess) {
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

    return router
}