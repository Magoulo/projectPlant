-- Create a table to store user accounts in.
/*CREATE TABLE accounts (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(30) NOT NULL,
	CONSTRAINT usernameUnique UNIQUE (username)
);*/

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
    REFERENCES UserAccount (userAccountID));

CREATE TABLE IF NOT EXISTS Ad (
  adID INT NOT NULL AUTO_INCREMENT,
  userID INT NOT NULL,
  title VARCHAR(45) NULL,
  latinName VARCHAR(45) NULL,
  description VARCHAR(45) NULL,
  isClosed TINYINT(0) NOT NULL,
  PRIMARY KEY (adID),
    FOREIGN KEY (userID)
    REFERENCES User (userID));

CREATE TABLE IF NOT EXISTS ImageBundle (
  imageBundleID INT NOT NULL AUTO_INCREMENT,
  adID INT NULL,
  coverImagePath VARCHAR(45) NULL,
  firstImagePath VARCHAR(45) NULL,
  secondImagePath VARCHAR(45) NULL,
  PRIMARY KEY (imageBundleID),
    FOREIGN KEY (adID)
    REFERENCES Ad (adID));

CREATE TABLE IF NOT EXISTS Bid (
  userID INT NOT NULL,
  adID INT NOT NULL,
  date DATE,
  imagePath VARCHAR(45),
  message TEXT,
  FOREIGN KEY (userID)
    REFERENCES User (userID),
  FOREIGN KEY (adID)
    REFERENCES Ad (adID));
  



-- Create a dummy accounts for testing.
INSERT INTO UserAccount (username, passwordHash) VALUES ("mooooo", "abc123");
INSERT INTO User (userAccountID,firstName,lastName,email,phoneNumber,city) VALUES ("1","Sabin","mooo","Smo@com","555-123","GBG");
INSERT INTO Ad (userID, title, latinName, description, isClosed) VALUES ("1","well maintained Monstera", "Monstera deliciosa","well maintained with roots in mullis", "0");
INSERT INTO ImageBundle (adID, coverImagePath, firstImagePath, secondImagePath) VALUES ("1","This is coverImagePath", "this is firstImagePath", "this is secondImagePath");

INSERT INTO UserAccount (username, passwordHash) VALUES ("ritasass", "123abc");
INSERT INTO User (userAccountID,firstName,lastName,email,phoneNumber,city) VALUES ("2","Rita","Muggeldottir","RM@com","555-00","Stchaan");
INSERT INTO Ad (userID, title, latinName, description, isClosed) VALUES ("2","Cashtree", "Pachira aquatica","Moneytree that keeps droppin bills", "0");
INSERT INTO ImageBundle (adID, coverImagePath, firstImagePath, secondImagePath) VALUES ("2","This is coverImagePath", "this is firstImagePath", "this is secondImagePath");

INSERT INTO UserAccount (username, passwordHash) VALUES ("slugger", "123abc");
INSERT INTO User (userAccountID,firstName,lastName,email,phoneNumber,city) VALUES ("3","Slugs","Slugsen","SS@com","555-0222","JKPG");
INSERT INTO Ad (userID, title, latinName, description, isClosed) VALUES ("3","Lilly", "blablaLatin","Lilly that keeps droppin bills", "0");
INSERT INTO ImageBundle (adID, coverImagePath, firstImagePath, secondImagePath) VALUES ("3","This is coverImagePath", "this is firstImagePath", "this is secondImagePath");

INSERT INTO Bid(userID, adID, date, imagePath, message) VALUES ("2", "1", "2022-02-16", "This is the imagePath to bid", "Hi I would like to buy your monstera");
INSERT INTO Bid(userID, adID, date, imagePath, message) VALUES ("1", "2", "2022-02-22", "This is the imagePath to bid", "Hi I would like to buy your Moneytree");
INSERT INTO Bid(userID, adID, date, imagePath, message) VALUES ("3", "1", "2022-02-22", "This is the imagePath to bid", "I am takeing the monstera with me");

 /*       sqLite
------------------------------------------------------------------------------------------------------
CREATE TABLE "UserAccounts" (
	"userAccountID"	INTEGER,
	"username"	TEXT,
	"passwordHash"	TEXT,
	PRIMARY KEY("userAccountID" AUTOINCREMENT)
);

CREATE TABLE "Users" (
	"userID"	INTEGER,
	"userAccountID"	INTEGER,
	"firstName"	TEXT,
	"lastName"	TEXT,
	"email"	TEXT,
	"phoneNumber"	TEXT,
	"city"	TEXT,
	FOREIGN KEY("userAccountID") REFERENCES "UserAccounts",
	PRIMARY KEY("userID" AUTOINCREMENT)
);

CREATE TABLE "Ads" (
	"adID"	INTEGER,
	"UserID"	INTEGER,
	"title"	TEXT,
	"latinName"	TEXT,
	"description"	TEXT,
	"isClosed"	INTEGER,
	PRIMARY KEY("adID"),
	FOREIGN KEY("UserID") REFERENCES "Users"
);

CREATE TABLE "Images" (
	"imageID"	INTEGER,
	"adID"	INTEGER,
	"coverImagePath"	TEXT,
	"fisrtImagePath"	TEXT,
	"secondImagePath"	TEXT,
	PRIMARY KEY("imageID"),
	FOREIGN KEY("adID") REFERENCES "Ads"
);

        mySQL
-----------------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS UserAccounts (
  userAccountID INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(45) NOT NULL,
  passwordHash VARCHAR(60) NOT NULL,
  PRIMARY KEY (`userAccountID`))

CREATE TABLE IF NOT EXISTS `mydb`.`Users` (
  `userID` INT NOT NULL AUTO_INCREMENT,
  `userAcccountID` INT NOT NULL,
  `firstName` VARCHAR(45) NULL,
  `lastName` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `phoneNumber` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  PRIMARY KEY (`userID`),
  INDEX `userAccountID_idx` (`userAcccountID` ASC) VISIBLE,
  CONSTRAINT `userAccountID`
    FOREIGN KEY (`userAcccountID`)
    REFERENCES `mydb`.`UserAccounts` (`userAccountID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `mydb`.`Ads` (
  `adID` INT NOT NULL AUTO_INCREMENT,
  `UserID` INT NOT NULL,
  `title` VARCHAR(45) NULL,
  `latinName` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `isClosed` TINYINT(0) NOT NULL,
  INDEX `UserID_idx` (`UserID` ASC) VISIBLE,
  CONSTRAINT `UserID`
    FOREIGN KEY (`UserID`)
    REFERENCES `mydb`.`Users` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `mydb`.`Ads` (
  `adID` INT NOT NULL AUTO_INCREMENT,
  `UserID` INT NOT NULL,
  `title` VARCHAR(45) NULL,
  `latinName` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `isClosed` TINYINT(0) NOT NULL,
  INDEX `UserID_idx` (`UserID` ASC) VISIBLE,
  PRIMARY KEY (`adID`),
  CONSTRAINT `UserID`
    FOREIGN KEY (`UserID`)
    REFERENCES `mydb`.`Users` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `mydb`.`Images` (
  `imageID` INT NOT NULL AUTO_INCREMENT,
  `adID` INT NULL,
  `coverImagePath` VARCHAR(45) NULL,
  `firstImagePath` VARCHAR(45) NULL,
  `secondImagePath` VARCHAR(45) NULL,
  INDEX `adID_idx` (`adID` ASC) VISIBLE,
  CONSTRAINT `adID`
    FOREIGN KEY (`adID`)
    REFERENCES `mydb`.`Ads` (`adID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

*/