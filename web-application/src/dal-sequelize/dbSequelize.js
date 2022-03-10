const { Sequelize, DataTypes } = require('sequelize')
const { addAbortSignal } = require('stream')
const Op = Sequelize.Op

const dbname = "postgres"
const hostname = "postgres"
const dialect = "postgres"
const ports = 5432
const user = "postgres"
const password = "abc123"

const sequelize = new Sequelize(dbname, user, password, {
	host: hostname,
	port: ports,
	dialect: dialect,
	logging: false
})

const User = sequelize.define("user", {
	firstName: DataTypes.TEXT,
	lastName: DataTypes.TEXT,
	email: DataTypes.TEXT,
	phoneNumber: DataTypes.TEXT,
	city: DataTypes.TEXT
})

const UserAccount = sequelize.define("userAccount", {
	username: DataTypes.TEXT,
	passwordHash: DataTypes.TEXT
})

const Bid = sequelize.define("bid", {
	date: DataTypes.DATE,
	imagePath: DataTypes.TEXT,
	message: DataTypes.TEXT,
	status: DataTypes.TEXT
})

const Ad = sequelize.define("ad", {
	title: DataTypes.TEXT,
	latinName: DataTypes.TEXT,
	description: DataTypes.TEXT,
	isClosed: DataTypes.BOOLEAN
})

const ImageBundle = sequelize.define("imageBundle", {
	coverImagePath: DataTypes.TEXT,
	firstImagePath: DataTypes.TEXT,
	secondImagePath: DataTypes.TEXT
})


UserAccount.hasMany(User, { foreignKey: 'userAccountID' });
User.belongsTo(UserAccount, { foreignKey: "userAccountID" })

Ad.hasOne(ImageBundle, { foreignKey: 'adID' });
ImageBundle.belongsTo(Ad, { foreignKey: "adID" })

User.hasMany(Ad, { foreignKey: 'userID' });
Ad.belongsTo(User, { foreignKey: "userID" })

Ad.hasMany(Bid, { foreignKey: 'adID' });
Bid.belongsTo(Ad, { foreignKey: "adID" })

User.hasMany(Bid, { foreignKey: 'userID' });
Bid.belongsTo(User, { foreignKey: "userID" })

sequelize.sync()
// Find or Create data in tables -------------------------------------------------------------------------------------------------------------------------
UserAccount.findOrCreate({
	where: { username: "billy", passwordHash: "123" },
	defaults: { username: "billy", passwordHash: "123" }
}).then(([userAccount, created]) => {
	if (created) {
		User.findOrCreate({
			where: { firstName: "Billy", lastName: "May", email: "BillyMay@mail.com", phoneNumber: "123", city: "Louisiana" },
			defaults: { firstName: "Billy", lastName: "May", email: "BillyMay@mail.com", phoneNumber: "123", city: "Louisiana", userAccountID: userAccount.dataValues.id }
		}).then(([user, created]) => {

			console.log("firstname: ", user.firstName);
			console.log("lastname: ", user.lastName);
			console.log("created: ", created); // true
		});
	}
	console.log("userAccount: ", userAccount); // userAccount
	console.log("user: ", User); // user
	console.log(created); // true
});

Ad.findOrCreate({
	where: { title: "well maintained Monstera", latinName: "Monstera deliciosa", description: "well maintained speciement, 3 years old", isClosed: "0", userID: 1 },
	defaults: { title: "well maintained Monstera", latinName: "Monstera deliciosa", description: "well maintained speciement, 3 years old", isClosed: "0", userID: 1 }
}).then(([ad, created]) => {
	if (created) {
		ImageBundle.findOrCreate({
			where: { coverImagePath: "variegata-1.jpg", firstImagePath: "monstera-propagation-in-water-scaled.jpg", secondImagePath: "catesthill-propogating-monstera-plant-4.jpg", adID: ad.dataValues.id },
			defaults: { coverImagePath: "variegata-1.jpg", firstImagePath: "monstera-propagation-in-water-scaled.jpg", secondImagePath: "catesthill-propogating-monstera-plant-4.jpg", adID: ad.dataValues.id }
		}).then(([imageBundle, created]) => {

			console.log("imageBundle: ", imageBundle); // imageBundle
			console.log("created: ", created); // true
		});
	}
	console.log("ad: ", ad); // ad
	console.log("imageBundle: ", ImageBundle); // imageBundle
	console.log(created); // true
});

/*
INSERT INTO Ad (userID, title, latinName, description, isClosed) VALUES ("1","well maintained Monstera", "Monstera deliciosa","well maintained with roots in mullis", "0");
INSERT INTO ImageBundle (adID, coverImagePath, firstImagePath, secondImagePath) VALUES ("1","variegata-1.jpg", "monstera-propagation-in-water-scaled.jpg", "catesthill-propogating-monstera-plant-4.jpg");
*/

// -----------------------------------------------------------------------------------------------------------------------------------------------------

const models = { User, UserAccount, Bid, Ad, ImageBundle }

module.exports = { models, Op }