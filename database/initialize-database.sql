CREATE TABLE IF NOT EXISTS UserAccount (
  userAccountID INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(45) NOT NULL QNIQUE,
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

CREATE TABLE IF NOT EXISTS Ad (
  adID INT NOT NULL AUTO_INCREMENT,
  userID INT NOT NULL,
  title VARCHAR(45) NULL,
  latinName VARCHAR(45) NULL,
  description Text NULL,
  isClosed TINYINT(0) NOT NULL,
  PRIMARY KEY (adID),
    FOREIGN KEY (userID)
    REFERENCES User (userID)
    ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS ImageBundle (
  imageBundleID INT NOT NULL AUTO_INCREMENT,
  adID INT NULL,
  coverImagePath TEXT NULL,
  firstImagePath TEXT NULL,
  secondImagePath TEXT NULL,
  PRIMARY KEY (imageBundleID),
    FOREIGN KEY (adID)
    REFERENCES Ad (adID)
    ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS Bid (
  bidID INT NOT NULL AUTO_INCREMENT,
  userID INT NOT NULL,
  adID INT NOT NULL,
  datePosted DATETIME,
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