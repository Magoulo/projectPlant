const { models } = require('./dbSequelize')

/*
CREATE TABLE IF NOT EXISTS UserAccount (
  userAccountID INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(45) NOT NULL,
  passwordHash VARCHAR(60) NOT NULL,
  PRIMARY KEY (userAccountID));

CREATE TABLE IF NOT EXISTS User (
  userID INT NOT NULL AUTO_INCREMENT,
  userAccountID INT NOT NULL,
  firstName VARCHAR(45) NULL,
  lastName VARCHAR(45) NULL,
  email VARCHAR(45) NULL,
  phoneNumber VARCHAR(45) NULL,
  city VARCHAR(45) NULL,
   PRIMARY KEY (userID),
  FOREIGN KEY (userAccountID)
	REFERENCES UserAccount (userAccountID)
	ON DELETE CASCADE);
*/
module.exports = function () {
	return {

		getUserByAccountID: function (userAccountID, callback) {
			models.User.findOne({ 
				include: [{ 
					model: models.UserAccount,
				 where: { id: userAccountID }				
				}]			
			}).then((user) => { 
				callback(user.dataValues)
				console.log("Results: ", results)
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

			const query = "SELECT * FROM User WHERE userID = ? LIMIT 1"
			const values = [userID]

			db.query(query, values, function (error, User) {
				if (error) {
					callback(['databaseError in User table'], null)
				} else {
					callback([], User[0])
				}
			})
		},

		updateUserByUserID: function (userID, firstName, lastName, email, phoneNumber, city, callback) {

			const query = "UPDATE User SET firstName = ?, lastName = ?, email = ? , phoneNumber = ?, city = ? WHERE userID = ?"
			const values = [firstName, lastName, email, phoneNumber, city, userID]

			db.query(query, values, function (error) {
				callback(error)
			})
		},

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
		}

	}
}