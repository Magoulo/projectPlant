const express = require('express')

module.exports = function ({ adManager, userManager }) {
    const router = express.Router()

    router.get("/", function (request, response) {

        adManager.getAllAds(function (errors, Ad) {

            if (errors.length !== 0) {
                response.status(400)
            } else {
                response.status(200).json(Ad)
            }
        })
    })

    router.get("/myAds", function (request, response) {

        const authorizationHeader = request.header("Authorization")
        const accessToken = authorizationHeader.substring('Bearer '.length)

        var tokenContent = {}
        adManager.isCorrectToken(accessToken, function (verificationResult) {
            tokenContent = verificationResult
        })

        if (tokenContent.errors) {
            response.status(401).end()
        } else {
            adManager.getAllAdsByUserID(tokenContent.payload.userID, function (errors, Ads) {
                if (errors.length !== 0) {
                    response.status(400).json(errors)
                } else {

                    response.status(200).json([Ads])
                }
            })
        }
    })

    router.put('/:adID', function (request, response) {

        const authorizationHeader = request.header("Authorization")
        const accessToken = authorizationHeader.substring('Bearer '.length)

        const adID = request.params.adID
        const title = request.body.title
        const latinName = request.body.latinName
        const description = request.body.description
        const Ad = { id: adID, title: title, latinName: latinName, description: description }

        var tokenContent = {}
        adManager.isCorrectToken(accessToken, function (verificationResult) {
            tokenContent = verificationResult
        })

        if (tokenContent.errors) {
            response.status(401).json(tokenContent.errors)
        } else {

            adManager.userHasAdAccess(adID, tokenContent.payload.userID, function (errors, userHasAcces) {
                if (errors.length !== 0) {
                    response.status(400).json(errors)
                } else {
                    if (!userHasAcces) {
                        response.status(401).json(["Not authorized"])
                    } else {
                        adManager.updateAdByAdID(Ad, function (errors) {
                            if (errors.length !== 0) {
                                response.status(400).json(errors)

                            } else {
                                response.status(204).end()
                            }
                        })
                    }
                }
            })

        }
    })

    router.get("/adUpdate/:adID", function (request, response) {

        const authorizationHeader = request.header("Authorization")
        const accessToken = authorizationHeader.substring('Bearer '.length)

        const adID = request.params.adID

        var tokenContent = {}
        adManager.isCorrectToken(accessToken, function (verificationResult) {
            tokenContent = verificationResult
        })

        if (tokenContent.errors) {
            response.status(401).json(tokenContent.errors)
        } else {
            adManager.getAdByAdID(adID, function (errors, Ad) {
                if (errors.length !== 0) {
                    response.status(400).json(errors)
                } else {
                    response.status(200).json(Ad)
                }
            })
        }
    })

    router.get("/adDelete/:adID", function (request, response) {

        const authorizationHeader = request.header("Authorization")
        const accessToken = authorizationHeader.substring('Bearer '.length)

        const adID = request.params.adID

        var tokenContent = {}
        adManager.isCorrectToken(accessToken, function (verificationResult) {
            tokenContent = verificationResult
        })

        if (tokenContent.errors) {
            response.status(401).json(tokenContent.errors)
        } else {
            adManager.getAdByAdID(adID, function (errors, Ad) {
                if (errors.length !== 0) {
                    response.status(400).json(errors)
                } else {
                    response.status(200).json(Ad)
                }
            })
        }
    })

    router.delete("/:adID", function (request, response) {

        const authorizationHeader = request.header("Authorization")
        const accessToken = authorizationHeader.substring('Bearer '.length)

        const adID = request.params.adID

        var tokenContent = {}
        adManager.isCorrectToken(accessToken, function (verificationResult) {
            tokenContent = verificationResult
        })

        if (tokenContent.errors) {
            response.status(401).json(tokenContent.errors)
        } else {

            adManager.userHasAdAccess(adID, tokenContent.payload.userID, function (errors, userHasAcces) {
                if (errors.length !== 0) {
                    response.status(400).json(errors)
                } else {
                    if (!userHasAcces) {
                        response.status(401).json(["Not authorized"])
                    } else {
                        adManager.deleteAd(adID, function (errors) {
                            if (errors.length !== 0) {
                                response.status(400).json(errors)
                            } else {
                                response.status(204).end()
                            }
                        })
                    }
                }
            })

        }
    })

    router.post("/", function (request, response) {

        const authorizationHeader = request.header("Authorization")
        const accessToken = authorizationHeader.substring('Bearer '.length)

        const coverImageFile = "no-image.png"
        const firstImageFile = "no-image.png"
        const secondImageFile = "no-image.png"

        var tokenContent = {}
        adManager.isCorrectToken(accessToken, function (verificationResult) {
            tokenContent = verificationResult
        })

        const ad = { userID: tokenContent.payload.userID, title: request.body.title, latinName: request.body.latinname, description: request.body.description, isClosed: 0 }

        if (tokenContent.errors) {
            response.status(401).end()

        } else {
            adManager.createAd(ad, function (errors, Ad) {

                if (errors.length !== 0) {
                    response.status(400).json(errors)
                } else {
                    const imageBundle = { adID: Ad.id, coverImagePath: coverImageFile, firstImagePath: firstImageFile, secondImagePath: secondImageFile }

                    adManager.createImageBundle(imageBundle, function (errors, ImageBundle) {
                        if (errors.length !== 0) {

                            errors.push("error in create Imagebundle")
                            response.status(400).json(errors)
                        } else {

                            response.status(201).json({
                                ad,
                                imageBundle
                            })
                        }
                    })
                }
            })
        }
    })

    router.get('/:adID', function (request, response) {
        const adID = request.params.adID

        adManager.getAdByAdID(adID, function (errors, Ad) {
            if (errors.length !== 0) {
                response.status(500)
            } else {
                userManager.getUserByUserID(Ad.userID, function (errors, User) {

                    if (errors.length !== 0) {
                        response.status(500)
                    } else {
                        response.status(200).json({ Ad, User })
                    }
                })
            }
        })
    })

    return router
}