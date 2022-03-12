const { models } = require('./dbSequelize')


module.exports = function () {
	return {

		getAllBidsByAdID: function (adID, callback) {

			models.Bid.findAll({
				where: { adID: adID }

			}).then((bid) => {
				console.log("all bids by adID: ", bid)
				callback(bid.dataValues)

			}).catch((error) => {
				console.log("error: ", error)
			})

		},

		/*getAllBidsByAdID: function (adID, callback) {

			const query = "SELECT * FROM Bid WHERE adID = ?"
			const values = [adID]

			db.query(query, values, function (error, Bid) {
				if (error) {
					callback(['databaseError in Bid table'], null)
				} else {
					callback([], Bid)
				}
			})
		},*/

		getBidByAdID: function (adID, callback) {

			models.Bid.findOne({
				where: { adID: adID }

			}).then((bid) => {
				console.log("bid by adID: ", bid)
				callback(bid.dataValues)

			}).catch((error) => {
				console.log("error: ", error)
			})

		},

		/*getBidByAdID: function (adID, callback) {

			const query = "SELECT * FROM Bid WHERE adID = ? LIMIT 1"
			const values = [adID]

			db.query(query, values, function (error, Bid) {
				if (error) {
					callback(['databaseError in Bid table'], null)
				} else {
					callback([], Bid[0])
				}
			})
		},*/

		getAllBidsByUserID: function (userID, callback) {

			models.Bid.findAll({
				raw: true,
				nest: true,
				where: { userID: userID },

				
				include: [{ 
					model: models.Ad,
				
					required: true,

					include: [{ 
						model: models.ImageBundle,
					
						required: true
					
					}],
				
				}],

			}).then((bid) => {
				console.log("all bids by userID: ", bid)
				callback([],bid)

			}).catch((error) => {
				console.log("error: ", error)
			})
		},

		/*getAllBidsByUserID: function (userID, callback) {

			const query = "SELECT Bid.bidID, Bid.userID, Bid.adID, Bid.message, Bid.date, Bid.imagePath, Bid.status, Ad.title, Ad.latinName, ImageBundle.coverImagePath FROM Bid JOIN Ad ON Bid.adID = Ad.adID JOIN ImageBundle ON Ad.adID = ImageBundle.adID WHERE Bid.userID = ? ORDER BY Bid.bidID DESC"
			const values = [userID]

			db.query(query, values, function (error, Bid) {
				if (error) {
					callback(['databaseError in Bid table'], null)
				} else {
					callback([], Bid)
				}
			})
		},*/

		createBid: function (Bid, callback) {
			const date = new Date().toISOString().slice(0, 19).replace('T', ' ')
			const status = "Pending"

			models.Bid.create({
				date: date,
				imagePath: Bid.imagePath,
				message: Bid.message,
				status: status,
				adID: Bid.adID,
				userID: Bid.userID
				
			}).then((bid) => {
				console.log("Created Bid: ", bid.dataValues)
				callback()

			}).catch((error) => {
				console.log("error: ", error)
			})
		},

		/*createBid: function (Bid, callback) {

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
		},*/

		deleteBid: function (bidID, callback) {

			models.Bid.destroy({
			
				where: { id: bidID}

			}).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
				if(rowDeleted === 1){
				   console.log('Deleted successfully');
				   callback()
				 }
			  }, function(err){
				  console.log(err); 
			  });
		},

		/*deleteBid: function (bidID, callback) {

			const query = `DELETE FROM Bid WHERE Bid.bidID = ?`
			const values = [bidID]

			db.query(query, values, function (error) {
				if (error) {
					callback(['databaseError'], null)
				} else {
					callback(error)
				}
			})
		},*/

		updateBidByBidID: function (bid, callback) {

			models.Bid.update({
				
				status: bid.status,		
			},
			{
				where: { id: bid.bidID }

			}).then((bid) => {
				console.log("Updated Bid (status should not be 'Pending'): ", bid)
				callback(bid.dataValues)

			}).catch((error) => {
				console.log("error: ", error)
			})
				
		},

		/*updateBidByBidID: function (bid, callback) {

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
		},*/

		setAllBidsToDeclined: function (adID, callback) {
			const status = "Declined"

			models.Bid.update({
				
				status: status,		
			},
			{
				where: { adID: adID }

			}).then((bid) => {
				console.log("All updated Bids (status should be 'Declined'): ", bid)
				callback(bid.dataValues)

			}).catch((error) => {
				console.log("error: ", error)
			})
		}

		/*setAllBidsToDeclined: function (adID, callback) {

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
		}*/

	}
}