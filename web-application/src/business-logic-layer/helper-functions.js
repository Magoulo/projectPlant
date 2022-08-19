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

        userIsAuthenticated: function (request) {
            if(!request.session.isLoggedIn) {
                return false
            } else return true
        },

        isCorrectToken: function (accessToken,callback) {
            jwt.verify(accessToken, SECRET, function (errors, payload) {
                var verificationResult = {errors: errors, payload: payload}

                callback(verificationResult)
            })  
        }
    }
}