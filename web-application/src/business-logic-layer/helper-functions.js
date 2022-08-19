
module.exports = function ({}) {
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
        }
    }
}