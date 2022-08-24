const { Sequelize, DataTypes } = require('sequelize')
const Op = Sequelize.Op

const dbname = "plantSwapDB"
const hostname = "postgres"
const dialect = "postgres"
const ports = 5432
const user = "plantSwap"
const password = "abc123"

const sequelize = new Sequelize(dbname, user, password, {
	host: hostname,
	port: ports,
	dialect: dialect,
	logging: false
})

const User = sequelize.define("User", {
	firstName: DataTypes.TEXT,
	lastName: DataTypes.TEXT,
	email: DataTypes.TEXT,
	phoneNumber: DataTypes.TEXT,
	city: DataTypes.TEXT
})

const UserAccount = sequelize.define("UserAccount", {
	username: {
		type: DataTypes.TEXT,
		unique: true
	},
	passwordHash: DataTypes.TEXT
})

const Bid = sequelize.define("Bid", {
	datePosted: DataTypes.DATE,
	imagePath: DataTypes.TEXT,
	message: DataTypes.TEXT,
	status: DataTypes.TEXT
})

const Ad = sequelize.define("Ad", {
	title: DataTypes.TEXT,
	latinName: DataTypes.TEXT,
	description: DataTypes.TEXT,
	isClosed: DataTypes.BOOLEAN
})

const ImageBundle = sequelize.define("ImageBundle", {
	coverImageName: DataTypes.TEXT,
	firstImageName: DataTypes.TEXT,
	secondImageName: DataTypes.TEXT
})


UserAccount.hasOne(User, {
	foreignKey: 'userAccountID',
	onDelete: 'CASCADE'
});
User.belongsTo(UserAccount, { foreignKey: "userAccountID" })

Ad.hasOne(ImageBundle, {
	foreignKey: 'adID',
	onDelete: 'CASCADE'
});
ImageBundle.belongsTo(Ad, { foreignKey: "adID" })

User.hasMany(Ad, {
	foreignKey: 'userID',
	onDelete: 'CASCADE'
});
Ad.belongsTo(User, { foreignKey: "userID" })

Ad.hasMany(Bid, {
	foreignKey: 'adID',
	onDelete: 'CASCADE'
});
Bid.belongsTo(Ad, { foreignKey: "adID" })

User.hasMany(Bid, {
	foreignKey: 'userID',
	onDelete: 'CASCADE'
});
Bid.belongsTo(User, { foreignKey: "userID" })

sequelize.sync()
const models = { User, UserAccount, Bid, Ad, ImageBundle }
module.exports = { models, Op }