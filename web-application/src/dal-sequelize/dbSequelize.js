const { Sequelize, DataTypes } = require('sequelize')
const { addAbortSignal } = require('stream')

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
}) //user: postgres

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

User.belongsTo(UserAccount, { foreignKey: "userAccountID" })
ImageBundle.belongsTo(Ad, { foreignKey: "adID" })
Ad.belongsTo(User, { foreignKey: "userID" })
Bid.belongsTo(Ad, { foreignKey: "adID" })
Bid.belongsTo(User, { foreignKey: "userID" })

sequelize.sync()

UserAccount.findOrCreate({
	where: { username: "jym", passwordHash: "123" },
	defaults: { username: "jym", passwordHash: "123" }
}).then(([userAccount, created]) => {
	if (created) {
		console.log(created)
		User.findOrCreate({
			where: { firstName: "Jym", lastName: "asd", email: "jom@mail",phoneNumber: "123", city: "jkpg" },
			defaults: { firstName: "Jym", lastName: "asd", email: "jom@mail",phoneNumber: "123", city: "jkpg", userAccountID: userAccount.dataValues.id}
		}).then(([user, created]) => {

			console.log(userAccount);
			console.log(user.firstName); // John
			console.log(user.lastName); // undefined
			console.log(created); // true
		});
	}
	console.log(user); // John
	console.log(user.passwordHash); // undefined
	console.log(created); // true
});



const models = { User, UserAccount, Bid, Ad, ImageBundle }

module.exports = { models }