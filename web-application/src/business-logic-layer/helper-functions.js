const SECRET = 'lelelelelelelble'
var jwt = require('jsonwebtoken');

module.exports = function ({ }) {
    return {

        hasErrors: function (errors) {
            for (const error of errors) {
                if (error.length > 0) {
                    return true
                }
            }
            return false
        },


        isCorrectToken: function (accessToken,callback) {
            jwt.verify(accessToken, SECRET, function (errors, payload) {
                var verificationResult = {errors: errors, payload: payload}

                callback(verificationResult)
            })  
        }


    }
}