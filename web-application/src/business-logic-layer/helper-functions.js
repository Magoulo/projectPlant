const SECRET = 'lelelelelelelble'
const { request } = require('http');
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

        userIsLoggedIn: function (session) {
            if(!session.isLoggedIn) {
                return true
            } else return false
        },

        isCorrectToken: function (accessToken,callback) {
            jwt.verify(accessToken, SECRET, function (errors, payload) {
                var verificationResult = {errors: errors, payload: payload}

                callback(verificationResult)
            })  
        },

        userHasAccess: function(adUserID,savedUserID){
            if(adUserID == savedUserID){
                return true
            } else {
                return false
            }
        }

    }
}