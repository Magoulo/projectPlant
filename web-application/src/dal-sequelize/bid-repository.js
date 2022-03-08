const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize("postgres://user:pass@example.com:5432/dbname")

const Bid = sequelize.define("bid",{
	date: DataTypes.DATE,
	imagePath: DataTypes.TEXT,
	message: DataTypes.TEXT,
	status: DataTypes.TEXT
})
const Ad = sequelize.define("ad", {
	title: DataTypes.TEXT,
	latinName: DataTypes.TEXT,
	description: DataTypes.TEXT,
	isClosed: DataTypes.NUMBER
})
const User = sequelize.define("user", {
	firstName: DataTypes.TEXT,
	lastName: DataTypes.TEXT,
	email: DataTypes.TEXT,
	phoneNumber: DataTypes.TEXT,
	city: DataTypes.TEXT
})

Bid.belongsTo(Ad)
Bid.belongsTo(User)
/*
CREATE TABLE IF NOT EXISTS Bid (
  bidID INT NOT NULL AUTO_INCREMENT,
  userID INT NOT NULL,
  adID INT NOT NULL,
  date DATETIME,
  imagePath VARCHAR(45),
  message TEXT,
  status VARCHAR(15),
  PRIMARY KEY (bidID),
  FOREIGN KEY (userID)
    REFERENCES User (userID)
    ON DELETE CASCADE,
  FOREIGN KEY (adID)
    REFERENCES Ad (adID) 
    ON DELETE CASCADE);
*/

module.exports = function () {
	return {

		getAllBidsByAdID: function (adID, callback) {

			const query = "SELECT * FROM Bid WHERE adID = ?"
			const values = [adID]

			db.query(query, values, function (error, Bid) {
				if (error) {
					callback(['databaseError in Bid table'], null)
				} else {
					callback([], Bid)
				}
			})
		},

		getBidByAdID: function (adID, callback) {

			const query = "SELECT * FROM Bid WHERE adID = ? LIMIT 1"
			const values = [adID]

			db.query(query, values, function (error, Bid) {
				if (error) {
					callback(['databaseError in Bid table'], null)
				} else {
					callback([], Bid[0])
				}
			})
		},

		getAllBidsByUserID: function (userID, callback) {

			const query = "SELECT Bid.bidID, Bid.userID, Bid.adID, Bid.message, Bid.date, Bid.imagePath, Bid.status, Ad.title, Ad.latinName, ImageBundle.coverImagePath FROM Bid JOIN Ad ON Bid.adID = Ad.adID JOIN ImageBundle ON Ad.adID = ImageBundle.adID WHERE Bid.userID = ? ORDER BY Bid.bidID DESC"
			const values = [userID]

			db.query(query, values, function (error, Bid) {
				if (error) {
					callback(['databaseError in Bid table'], null)
				} else {
					callback([], Bid)
				}
			})
		},

		createBid: function (Bid, callback) {

			const status = "Pending"
			const date = new Date().toISOString().slice(0, 19).replace('T', ' ')
			const query = `INSERT INTO Bid (userID, adID, date, imagePath, message, status) VALUES (?,?,?,?,?,?);`
			const values = [Bid.userID, Bid.adID, date, Bid.imagePath, Bid.message, status]

			console.log(date);

			db.query(query, values, function (error) {
				if (error) {
					callback(['databaseError'], null)
				} else {
					callback(error)
				}
			})
		},

		deleteBid: function (bidID, callback) {

			const query = `DELETE FROM Bid WHERE Bid.bidID = ?`
			const values = [bidID]

			db.query(query, values, function (error) {
				if (error) {
					callback(['databaseError'], null)
				} else {
					callback(error)
				}
			})
		},

		updateBidByBidID: function (bid, callback) {

			const query = "UPDATE Bid SET status = ? WHERE BidID = ?"
			const values = [bid.status, bid.bidID]

			db.query(query, values, function (error) {
				if (error) {
					callback(['databaseError'], null)
				} else {
					console.log("sucessfully update")
					callback(error)
				}
			})
		},

		setAllBidsToDeclined: function (adID, callback) {

			const status = "Declined"
			const query = "UPDATE Bid SET status = ? WHERE adID = ?"
			const values = [status, adID]

			db.query(query, values, function (error) {
				if (error) {
					callback(['databaseError'], null)
				} else {
					console.log("sucessfully updated all other ads to declined")
					callback(error)
				}
			})
		}

	}
}