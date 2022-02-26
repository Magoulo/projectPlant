const express = require('express')
const userManager = require('../../business-logic-layer/user-manager')
const router = express.Router()


router.get("/personalData", function (request, response) {

    userManager.getUserByAccountID(request.session.userID, function (errors, User) {
        const model = {
            errors: errors,
            User: User,
            session: request.session
        }

        response.render("personalData.hbs", model)
    })
})



module.exports = router