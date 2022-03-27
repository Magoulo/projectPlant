const { Sequelize, DataTypes } = require('sequelize')
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

const User = sequelize.define("User", {
	firstName: DataTypes.TEXT,
	lastName: DataTypes.TEXT,
	email: DataTypes.TEXT,
	phoneNumber: DataTypes.TEXT,
	city: DataTypes.TEXT
})

const UserAccount = sequelize.define("UserAccount", {
	username: DataTypes.TEXT,
	passwordHash: DataTypes.TEXT
})

const Bid = sequelize.define("Bid", {
	date: DataTypes.DATE,
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


// Creating dummy data in commented out code below

// Find or Create UserAccount and User ---------------------------------------------------------------------------------------------------------------------------

// Billy, userID: 1
/*UserAccount.findOrCreate({
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

// Rita, userID: 2
UserAccount.findOrCreate({
	where: { username: "rita", passwordHash: "123" },
	defaults: { username: "rita", passwordHash: "123" }
}).then(([userAccount, created]) => {
	if (created) {
		User.findOrCreate({
			where: { firstName: "rita", lastName: "Katt", email: "RitaKatt@com", phoneNumber: "555-00", city: "Stchaan" },
			defaults: { firstName: "rita", lastName: "Katt", email: "RitaKatt@com", phoneNumber: "555-00", city: "Stchaan", userAccountID: userAccount.dataValues.id }
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


// Kent, userID: 3
UserAccount.findOrCreate({
	where: { username: "kent", passwordHash: "123" },
	defaults: { username: "kent", passwordHash: "123" }
}).then(([userAccount, created]) => {
	if (created) {
		User.findOrCreate({
			where: { firstName: "Kent", lastName: "Cement", email: "KentCement@grus.com", phoneNumber: "0912-11111", city: "Byske" },
			defaults: { firstName: "Kent", lastName: "Cement", email: "KentCement@grus.com", phoneNumber: "0912-11111", city: "Byske", userAccountID: userAccount.dataValues.id }
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

// Doris, userID: 4
UserAccount.findOrCreate({
	where: { username: "doris", passwordHash: "123" },
	defaults: { username: "doris", passwordHash: "123" }
}).then(([userAccount, created]) => {
	if (created) {
		User.findOrCreate({
			where: { firstName: "Doris", lastName: "Koo", email: "Doris@koo.com", phoneNumber: "111", city: "Boliden" },
			defaults: { firstName: "Doris", lastName: "Koo", email: "Doris@koo.com", phoneNumber: "111", city: "Boliden", userAccountID: userAccount.dataValues.id }
		}).then(([user, created]) => {

			console.log("firstname: ", user.firstName);
			console.log("lastname: ", user.lastName);
			console.log("created: ", created); // true
		});
	}
	console.log("userAccount: ", userAccount); // userAccount
	console.log("user: ", User); // user
	console.log(created); // true
});*/



// Find or Create Ad and ImageBundle -------------------------------------------------------------------------------------------------------------------------


/*Ad.findOrCreate({
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

Ad.findOrCreate({
	where: { title: "Stunning Begonias", latinName: "Begonia maculata", description: "Tradeing cuttings with good root development", isClosed: "0", userID: 1 },
	defaults: { title: "Stunning Begonias", latinName: "Begonia maculata", description: "Tradeing cuttings with good root development", isClosed: "0", userID: 1 }
}).then(([ad, created]) => {
	if (created) {
		ImageBundle.findOrCreate({
			where: { coverImagePath: "9dbis4pt2o751.jpg", firstImagePath: "maculata-4-768x1024.jpg", secondImagePath: "PXL_20210501_190619891.jpg", adID: ad.dataValues.id },
			defaults: { coverImagePath: "9dbis4pt2o751.jpg", firstImagePath: "maculata-4-768x1024.jpg", secondImagePath: "PXL_20210501_190619891.jpg", adID: ad.dataValues.id }
		}).then(([imageBundle, created]) => {

			console.log("imageBundle: ", imageBundle); // imageBundle
			console.log("created: ", created); // true
		});
	}
	console.log("ad: ", ad); // ad
	console.log("imageBundle: ", ImageBundle); // imageBundle
	console.log(created); // true
});

Ad.findOrCreate({
	where: { title: "Cashtree", latinName: "Pachira aquatica", description: "Moneytree that keeps droppin bills", isClosed: "0", userID: 2 },
	defaults: { title: "Cashtree", latinName: "Pachira aquatica", description: "Moneytree that keeps droppin bills", isClosed: "0", userID: 2 }
}).then(([ad, created]) => {
	if (created) {
		ImageBundle.findOrCreate({
			where: { coverImagePath: "krukvaxter_images_bilder_pachira_aquatica.jpg", firstImagePath: "il_300x300.1012912306_dpeg.jpg", secondImagePath: "strandkastanj-538318.jpg", adID: ad.dataValues.id },
			defaults: { coverImagePath: "krukvaxter_images_bilder_pachira_aquatica.jpg", firstImagePath: "il_300x300.1012912306_dpeg.jpg", secondImagePath: "strandkastanj-538318.jpg", adID: ad.dataValues.id }
		}).then(([imageBundle, created]) => {

			console.log("imageBundle: ", imageBundle); // imageBundle
			console.log("created: ", created); // true
		});
	}
	console.log("ad: ", ad); // ad
	console.log("imageBundle: ", ImageBundle); // imageBundle
	console.log(created); // true
});

Ad.findOrCreate({
	where: { title: "Stargazer lily", latinName: "Lilium orientalis 'Stargazer'", description: "Flowers for both outdoors and indoors!", isClosed: "0", userID: 3 },
	defaults: { title: "Stargazer lily", latinName: "Lilium orientalis 'Stargazer'", description: "Flowers for both outdoors and indoors!", isClosed: "0", userID: 3 }
}).then(([ad, created]) => {
	if (created) {
		ImageBundle.findOrCreate({
			where: { coverImagePath: "aa184e45a9873944816d9ce825fb5a9a.jpg", firstImagePath: "liliumstargazer.jpg", secondImagePath: "lilium-orientalis-oriental-lily-pink-stargazer-garden_2.jpg", adID: ad.dataValues.id },
			defaults: { coverImagePath: "aa184e45a9873944816d9ce825fb5a9a.jpg", firstImagePath: "liliumstargazer.jpg", secondImagePath: "lilium-orientalis-oriental-lily-pink-stargazer-garden_2.jpg", adID: ad.dataValues.id }
		}).then(([imageBundle, created]) => {

			console.log("imageBundle: ", imageBundle); // imageBundle
			console.log("created: ", created); // true
		});
	}
	console.log("ad: ", ad); // ad
	console.log("imageBundle: ", ImageBundle); // imageBundle
	console.log(created); // true
});

Ad.findOrCreate({
	where: { title: "Friendly cacti", latinName: "Echinopsis pachanoi", description: "Very good for toothpicks", isClosed: "0", userID: 3 },
	defaults: { title: "Friendly cacti", latinName: "Echinopsis pachanoi", description: "Very good for toothpicks", isClosed: "0", userID: 3 }
}).then(([ad, created]) => {
	if (created) {
		ImageBundle.findOrCreate({
			where: { coverImagePath: "trichocereus_pachanoi.jpg", firstImagePath: "trichocereus-pachanoi-echinopsis-pachanoi-mini.jpg", secondImagePath: "sanpedro2.jpg", adID: ad.dataValues.id },
			defaults: { coverImagePath: "trichocereus_pachanoi.jpg", firstImagePath: "trichocereus-pachanoi-echinopsis-pachanoi-mini.jpg", secondImagePath: "sanpedro2.jpg", adID: ad.dataValues.id }
		}).then(([imageBundle, created]) => {

			console.log("imageBundle: ", imageBundle); // imageBundle
			console.log("created: ", created); // true
		});
	}
	console.log("ad: ", ad); // ad
	console.log("imageBundle: ", ImageBundle); // imageBundle
	console.log(created); // true
});

Ad.findOrCreate({
	where: { title: "Gras tree", latinName: "Xanthorrhoea", description: "Tradeing very rare Grass tree cuttings. Grass tree is native to the bush in Austalia and very rare outside the continent. I want to trade my cuttings for other ultra rare species", isClosed: "0", userID: 4 },
	defaults: { title: "Gras tree", latinName: "Xanthorrhoea", description: "Tradeing very rare Grass tree cuttings. Grass tree is native to the bush in Austalia and very rare outside the continent. I want to trade my cuttings for other ultra rare species", isClosed: "0", userID: 4 }
}).then(([ad, created]) => {
	if (created) {
		ImageBundle.findOrCreate({
			where: { coverImagePath: "2015-08-25 13.30.02.jpg", firstImagePath: "grass-tree-4-heads.jpg", secondImagePath: "IMG_8737.jpg", adID: ad.dataValues.id },
			defaults: { coverImagePath: "2015-08-25 13.30.02.jpg", firstImagePath: "grass-tree-4-heads.jpg", secondImagePath: "IMG_8737.jpg", adID: ad.dataValues.id }
		}).then(([imageBundle, created]) => {

			console.log("imageBundle: ", imageBundle); // imageBundle
			console.log("created: ", created); // true
		});
	}
	console.log("ad: ", ad); // ad
	console.log("imageBundle: ", ImageBundle); // imageBundle
	console.log(created); // true
});*/


// Find or Create Bid -------------------------------------------------------------------------------------------------------------------------


/*Bid.findOrCreate({
	where: { date: "2022-02-16", imagePath: "no-image.png", message: "Hi I would like to buy your Lillies", status: "Pending", userID: 2, adID: 4 },
	defaults: { date: "2022-02-16", imagePath: "no-image.png", message: "Hi I would like to buy your Lillies", status: "Pending", userID: 2, adID: 4 }
}).then(([bid, created]) => {
	
	console.log("bid: ", bid); // bid
	console.log(created); // true
});

Bid.findOrCreate({
	where: { date: "2022-02-16", imagePath: "no-image.png", message: "Those are som great lillies I want to buy!", status: "Pending", userID: 1, adID: 4 },
	defaults: { date: "2022-02-16", imagePath: "no-image.png", message: "Those are som great lillies I want to buy!", status: "Pending", userID: 1, adID: 4 }
}).then(([bid, created]) => {
	
	console.log("bid: ", bid); // bid
	console.log(created); // true
});*/

const models = { User, UserAccount, Bid, Ad, ImageBundle }

module.exports = { models, Op }