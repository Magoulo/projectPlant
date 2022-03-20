const express = require('express')
const path = require('path')

var jwt = require('jsonwebtoken');
const SECRET = 'lelelelelelelble'


module.exports = function ({ adManager, userManager }) {
    const router = express.Router()

    /* router.get("/ad", function (request, response) {response.render("ad.hbs", model)})*/
    /* router.get("/ads", function (request, response) {})*/
    /* router.get("/adCreate", function (request, response) {response.render("adCreate.hbs", model)})*/


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
        console.log("inne i myAds i backend")

        const authorizationHeader = request.header("Authorization")
        
        const accessToken = authorizationHeader.substring('bearer '.length)
        //accessToken.replace(/["*]/g,"")
        //const accessTokenTest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0xvZ2dlZEluIjp0cnVlLCJ1c2VySUQiOjMsImlhdCI6MTY0Nzc3ODY1MH0.NXZdOzperW2sVy4IgImicy5knO8ax9DGyZGmtKNp5Ic"
       // console.log("authorizationHeader: ",request.header("Authorization") )
       console.log("accessToken:",JSON.stringify(accessToken))
        //console.log("accessToken:",accessToken.token)
        //console.log("accessTokenTest:",accessTokenTest)
       // console.log("accessToken1:",accessToken1)

        var allAds = []
        var allBids = []

        jwt.verify(accessToken, SECRET, function (error, payload) {

            if (error) {
                console.log("jwt.verify error!", error)
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
                response.status(204).end()
            }
        })
    })


    router.post("/adCreate", function (request, response) {

        const authorizationHeader = request.header("Authorization")
        const accessToken = authorizationHeader.substring("Bearer ".length)

        const coverImageFile = request.files.coverImageFile
        const firstImageFile = request.files.firstImageFile
        const secondImageFile = request.files.secondImageFile

        const images = [coverImageFile, firstImageFile, secondImageFile]
        const errors = []

        jwt.verify(accessToken, SECRET, function (error, payload) {

            const ad = { userID: payload.userID, title: request.body.title, latinName: request.body.latinname, description: request.body.description, isClosed: 0 }

            if (error) {
                response.status(401).end()

            } else {
                for (var i = 0; i < images.length; i++) {

                    const uploadPath = path.resolve(__dirname, '../public/images/', images[i].name)

                    images[i].mv(uploadPath, function (error) {
                        if (error) {
                            errors.push("couldn't upload picture")
                            response.status(418).json(errors)
                        }
                    })
                }

                adManager.createAd(ad, function (error, Ad) {

                    if (error.length !== 0) {
                        response.status(400).json(errors)
                    } else {
                        const imageBundle = { adID: Ad.id, coverImagePath: coverImageFile.name, firstImagePath: firstImageFile.name, secondImagePath: secondImageFile.name }

                        adManager.createImageBundle(imageBundle, function (error, ImageBundle) {
                            if (error.length !== 0) {
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
                        response.status(200).json({Ad,User})
                    }
                })

            }
        })
    })


    return router
}