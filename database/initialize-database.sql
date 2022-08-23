CREATE TABLE IF NOT EXISTS UserAccount (
  userAccountID INT NOT NULL AUTO_INCREMENT,
  username TEXT NOT NULL QNIQUE,
  passwordHash TEXT NOT NULL,
  PRIMARY KEY (userAccountID));
  

CREATE TABLE IF NOT EXISTS User (
  userID INT NOT NULL AUTO_INCREMENT,
  userAccountID INT NOT NULL,
  firstName TEXT NULL,
  lastName TEXT NULL,
  email TEXT NULL,
  phoneNumber TEXT NULL,
  city TEXT NULL,
   PRIMARY KEY (userID),
  FOREIGN KEY (userAccountID)
    REFERENCES UserAccount (userAccountID)
    ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS Ad (
  adID INT NOT NULL AUTO_INCREMENT,
  userID INT NOT NULL,
  title TEXT NULL,
  latinName TEXT NULL,
  description Text NULL,
  isClosed TINYINT(0) NOT NULL,
  PRIMARY KEY (adID),
    FOREIGN KEY (userID)
    REFERENCES User (userID)
    ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS ImageBundle (
  imageBundleID INT NOT NULL AUTO_INCREMENT,
  adID INT NULL,
  coverImageName TEXT NULL,
  firstImageName TEXT NULL,
  secondImageName TEXT NULL,
  PRIMARY KEY (imageBundleID),
    FOREIGN KEY (adID)
    REFERENCES Ad (adID)
    ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS Bid (
  bidID INT NOT NULL AUTO_INCREMENT,
  userID INT NOT NULL,
  adID INT NOT NULL,
  datePosted DATETIME,
  imagePath TEXT,
  message TEXT,
  status TEXT,
  PRIMARY KEY (bidID),
  FOREIGN KEY (userID)
    REFERENCES User (userID)
    ON DELETE CASCADE,
  FOREIGN KEY (adID)
    REFERENCES Ad (adID) 
    ON DELETE CASCADE);