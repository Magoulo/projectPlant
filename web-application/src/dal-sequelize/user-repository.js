const { models } = require('./dbSequelize')


module.exports = function () {
	return {

		getUserByAccountID: function (userAccountID, callback) {

			models.User.findOne({
				where: { userAccountID: 1 } // hårdkodat atm
			}).then((User) => {
				callback([], User.dataValues)
			}).catch((error) => {
				console.log("error: ", error)
			})

		},

		/*	getUserByAccountID: function (userAccountID, callback) {
	
				const query = "SELECT * FROM User WHERE userAccountID = ? LIMIT 1"
				const values = [userAccountID]
	
				db.query(query, values, function (error, User) {
					if (error) {
						callback(['databaseError in user table'], null)
					} else {
						callback([], User[0])
					}
				})
			},*/

		getUserByUserID: function (userID, callback) {

			models.User.findOne({
				raw: true,
				where: { id: userID }
			}).then((user) => {

				console.log("user: ", user)
				callback([],user)
				//	console.log("Results: ", results)
			}).catch((error) => {
				console.log("error: ", error)
			})

		},

		/*
		getUserByUserID: function (userID, callback) {

			const query = "SELECT * FROM User WHERE userID = ? LIMIT 1"
			const values = [userID]

			db.query(query, values, function (error, User) {
				if (error) {
					callback(['databaseError in User table'], null)
				} else {
					callback([], User[0])
				}
			})
		},*/


		updateUserByUserID: function (userID, firstName, lastName, email, phoneNumber, city, callback) {

			models.User.update({
				firstName: firstName,
				lastName: lastName,
				email: email,
				phoneNumber:phoneNumber,
				city:city
			},
			{
				where: { id: userID }
			}).then((user) => {

				console.log("user: ", user)
				callback(user.dataValues)
				//	console.log("Results: ", results)
			}).catch((error) => {
				console.log("error: ", error)
			})

		},

		/*
		updateUserByUserID: function (userID, firstName, lastName, email, phoneNumber, city, callback) {

			const query = "UPDATE User SET firstName = ?, lastName = ?, email = ? , phoneNumber = ?, city = ? WHERE userID = ?"
			const values = [firstName, lastName, email, phoneNumber, city, userID]

			db.query(query, values, function (error) {
				callback(error)
			})
		},*/

		createUser: function (user, callback) {

			models.User.create({
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				phoneNumber: user.phoneNumber,
				city: user.city,
				userAccountID: user.userAccountID
			}).then((user) => {

				console.log("user: ", user)
				callback(user.dataValues)
				//	console.log("Results: ", results)
			}).catch((error) => {
				console.log("error: ", error)
			})

		}

	/*
		createUser: function (user, callback) {

			const query = `INSERT INTO User (userAccountID, firstName, lastName, email, phoneNumber, city) VALUES (?, ?, ?, ?, ?, ?)`
			const values = [user.userAccountID, user.firstName, user.lastName, user.email, user.phoneNumber, user.city]

			db.query(query, values, function (error, results) {
				if (error) {
					// TODO: Look for usernameUnique violation.
					callback(['databaseError in createUser'], null)
				} else {
					callback([], results.insertId)
				}
			})
		}*/

	}
}