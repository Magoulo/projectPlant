-- Create a table to store user accounts in.
/*CREATE TABLE accounts (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(30) NOT NULL,
	CONSTRAINT usernameUnique UNIQUE (username)
);*/

CREATE TABLE IF NOT EXISTS UserAccounts (
  userAccountID INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(45) NOT NULL,
  passwordHash VARCHAR(60) NOT NULL,
  PRIMARY KEY (userAccountID))
  

CREATE TABLE IF NOT EXISTS Users (
  userID INT NOT NULL AUTO_INCREMENT,
  userAcccountID INT NOT NULL,
  firstName VARCHAR(45) NULL,
  lastName VARCHAR(45) NULL,
  email VARCHAR(45) NULL,
  phoneNumber VARCHAR(45) NULL,
  city VARCHAR(45) NULL,

  PRIMARY KEY (userID),
  CONSTRAINT userAccountID
    FOREIGN KEY (userAcccountID)
    REFERENCES UserAccounts (userAccountID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

CREATE TABLE IF NOT EXISTS Ads (
  adID INT NOT NULL AUTO_INCREMENT,
  UserID INT NOT NULL,
  title VARCHAR(45) NULL,
  latinName VARCHAR(45) NULL,
  description VARCHAR(45) NULL,
  isClosed TINYINT(0) NOT NULL,
  PRIMARY KEY (adID),
  CONSTRAINT UserID
    FOREIGN KEY (UserID)
    REFERENCES Users (userID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

CREATE TABLE IF NOT EXISTS Images (
  imageID INT NOT NULL AUTO_INCREMENT,
  adID INT NULL,
  coverImagePath VARCHAR(45) NULL,
  firstImagePath VARCHAR(45) NULL,
  secondImagePath VARCHAR(45) NULL,
  PRIMARY KEY (imageID),
  CONSTRAINT adID
    FOREIGN KEY (adID)
    REFERENCES Ads (adID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)


-- Create a dummy account for testing.
INSERT INTO userAccounts (username, passwordHash) VALUES ("Alice", "abc123");
INSERT INTO Users (userAcccountID,firstName,lastName,email,phoneNumber,city) VALUES ("1","alice","bah","ab@com","555-123","GBG")


/*

        sqLite
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