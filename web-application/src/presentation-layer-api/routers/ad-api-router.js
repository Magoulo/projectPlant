const express = require('express')
const path = require('path')

var jwt = require('jsonwebtoken');
const SECRET = 'lelelelelelelble'


module.exports = function ({ adManager, userManager }) {
    const router = express.Router()


    router.get("/", function (request, response) {

        adManager.getAllAds(function (errors, Ad) {

            if (errors.length !== 0) {
                response.status(400).json(errors)
            } else {
                response.status(200).json(Ad)
            }
        })
    })


    router.get("/myAds", function (request, response) {

        const authorizationHeader = request.header("Authorization")
        const accessToken = authorizationHeader.substring("Bearer ".length)

        var allAds = []
        var allBids = []

        jwt.verify(accessToken, SECRET, function (error, payload) {

            if (error) {
                response.status(401).end()
            } else {
                adManager.getAllAdsByUserID(payload.userID, function (errors, Ad) {

                    if (errors.length !== 0) {
                        response.status(400).json(errors)
                    } else {
                        allAds = Ad //???
                    }
                })

                adManager.getAllAdsBidsUsersByUserID(payload.userID, function (errors, adOffers) {
                    if (errors.length !== 0) {
                        response.status(400).json(errors)

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

                        console.log("json response: [allAds,adAccepted]", [allAds, adAccepted])

                        response.status(200).json([allAds, adAccepted])
                    }
                })
            }
        })
    })

    router.put('/adUpdate/:adID/update', function (request, response) {//csrfProtection, function (request, response) {

        const adID = request.params.adID
        const title = request.body.title
        const latinName = request.body.latinname
        const description = request.body.description

        adManager.updateAdByAdID(adID, title, latinName, description, function (error) {

            if (error.length !== 0) {
                response.status(400).json(error)

            } else {
                response.status(204).end()
            }
        })
    })

    router.get("/adUpdate/:adID", function (request, response) {
        const adID = request.params.adID

        adManager.getAdByAdID(adID, function (error, Ad) {
            if (error.length !== 0) {
                response.status(400).json(error)

            } else {
                response.status(200).json(Ad)
            }
        })
    })

    router.get("/adDelete/:adID", function (request, response) {
        const adID = request.params.adID

        adManager.getAdByAdID(adID, function (error, Ad) {
            if (error.length !== 0) {
                response.status(400).json(error)

            } else {
                response.status(200).json(Ad)
            }
        })
    })

    router.delete("/adDelete/:adID/delete", function (request, response) {
        const adID = request.params.adID

        adManager.deleteAd(adID, function (errors) {
            if (errors.length !== 0) {
                response.status(400).json(errors)
            } else {
                console.log("Ad was delete succesfully")
                response.status(204).end()
            }
        })
    })

    /* router.get("/adCreate", function (request, response) {
 
         const model = {
             session: request.session,
             layout: 'account.hbs'
         }
 
         response.render("adCreate.hbs", model)
     })*/


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
                response.status(400).json(errors)
            } else {
                console.log("New ad created with the adID: ", Ad.id)
                const imageBundle = { adID: Ad.id, coverImagePath: coverImageFile.name, firstImagePath: firstImageFile.name, secondImagePath: secondImageFile.name }

                adManager.createImageBundle(imageBundle, function (error, ImageBundle) {
                    if (error.length !== 0) {
                        console.log("error in create Imagebundle")
                        errors.push("error in create Imagebundle")
                        response.status(400).json(errors)
                    } else {
                        console.log("new imageBundle created with the iD: ", ImageBundle.id)
                        response.status(201).json({
                            ad,
                            imageBundle
                        })
                    }
                })
            }
        })

    })

    router.get('/:adID', function (request, response) {
        const adID = request.params.adID

        adManager.getAdByAdID(adID, function (errors, Ad) {
            if (errors.length !== 0) {
                response.status(400).json(errors)

            } else {

                userManager.getUserByUserID(Ad.userID, function (errors, User) {
                    if (errors.length !== 0) {
                        response.status(400).json(errors)

                    } else {

                        response.status(200).json({
                            Ad,
                            User
                        })
                    }
                })

            }
        })
    })

    /* router.get("/ad", function (request, response) {
 
         const model = {
             session: request.session
         }
 
         response.render("ad.hbs", model)
     })*/

    /* router.get("/ads", function (request, response) {
         response.render("ads.hbs")
     })*/

    return router
}