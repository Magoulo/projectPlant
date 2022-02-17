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
  coverImagePath TEXT NULL,
  firstImagePath TEXT NULL,
  secondImagePath TEXT NULL,
  PRIMARY KEY (imageBundleID),
    FOREIGN KEY (adID)
    REFERENCES Ad (adID));

/* LÄ*gg till PK och col Status */
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
  



-- Dummy data for testing.
INSERT INTO UserAccount (username, passwordHash) VALUES ("mooooo", "abc123");
INSERT INTO User (userAccountID,firstName,lastName,email,phoneNumber,city) VALUES ("1","Sabin","mooo","Smo@com","555-123","GBG");
INSERT INTO Ad (userID, title, latinName, description, isClosed) VALUES ("1","well maintained Monstera", "Monstera deliciosa","well maintained with roots in mullis", "0");
INSERT INTO ImageBundle (adID, coverImagePath, firstImagePath, secondImagePath) VALUES ("1","https://blombudsportalen.se/wp-content/uploads/2021/04/Monstera-deliciosa-variegata.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR43qDr4ntXQXIUHKuvLkMB_VE6Jcuvn9zcPTTK2hMjjQ3bnuNp30yAHyiCHAE2t_hl0uo&usqp=CAU", "https://www.blomsterlandet.se/optimized/c-ProductDetailsSingle-Default-Sm2x/2293e09b/globalassets/catalog-images/7/43540/4c1dbcc6ea7fcfde28bafcd105ec647a.jpg");

INSERT INTO UserAccount (username, passwordHash) VALUES ("ritasass", "123abc");
INSERT INTO User (userAccountID,firstName,lastName,email,phoneNumber,city) VALUES ("2","Rita","Muggeldottir","RM@com","555-00","Stchaan");
INSERT INTO Ad (userID, title, latinName, description, isClosed) VALUES ("2","Cashtree", "Pachira aquatica","Moneytree that keeps droppin bills", "0");
INSERT INTO ImageBundle (adID, coverImagePath, firstImagePath, secondImagePath) VALUES ("2","https://www.mydomaine.com/thmb/PunwYf9El_Nyens5QMJ4d4moXOw=/1414x2121/filters:fill(auto,1)/GettyImages-1060620362-2940035374b843f3af034d0512dd2b54.jpg", "https://www.gardeningknowhow.com/wp-content/uploads/2015/04/money-tree.jpg", "https://www.gardeningknowhow.com/wp-content/uploads/2013/04/money-tree.jpg");

INSERT INTO UserAccount (username, passwordHash) VALUES ("slugger", "123abc");
INSERT INTO User (userAccountID,firstName,lastName,email,phoneNumber,city) VALUES ("3","Slugs","Slugsen","SS@com","555-0222","JKPG");
INSERT INTO Ad (userID, title, latinName, description, isClosed) VALUES ("3","Lilly", "blablaLatin","Lilly that keeps droppin bills", "0");
INSERT INTO ImageBundle (adID, coverImagePath, firstImagePath, secondImagePath) VALUES ("3","https://i.pinimg.com/564x/aa/18/4e/aa184e45a9873944816d9ce825fb5a9a.jpg", "https://sunnyside-gardens.com/wp-content/uploads/2012/11/liliumstargazer.jpg", "https://www.americanmeadows.com/media/catalog/product/l/i/lilium-orientalis-oriental-lily-pink-stargazer-garden_2.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=560&width=560&canvas=560:560");

INSERT INTO Bid(userID, adID, date, imagePath, message) VALUES ("2", "1", "2022-02-16", "This is the imagePath to bid", "Hi I would like to buy your monstera");
INSERT INTO Bid(userID, adID, date, imagePath, message) VALUES ("1", "2", "2022-02-22", "This is the imagePath to bid", "Hi I would like to buy your Moneytree");
INSERT INTO Bid(userID, adID, date, imagePath, message) VALUES ("3", "1", "2022-02-22", "This is the imagePath to bid", "I am takeing the monstera with me");

INSERT INTO Ad (userID, title, latinName, description, isClosed) VALUES ("1","Monstera", "Monstera deliciosa","Another Monstera", "0");
INSERT INTO ImageBundle (adID, coverImagePath, firstImagePath, secondImagePath) VALUES ("4","https://www.mydomaine.com/thmb/PunwYf9El_Nyens5QMJ4d4moXOw=/1414x2121/filters:fill(auto,1)/GettyImages-1060620362-2940035374b843f3af034d0512dd2b54.jpg", "https://www.gardeningknowhow.com/wp-content/uploads/2015/04/money-tree.jpg", "https://www.gardeningknowhow.com/wp-content/uploads/2013/04/money-tree.jpg");
INSERT INTO Ad (userID, title, latinName, description, isClosed) VALUES ("3","flower", "blablaLatin","Lilly that keeps droppin flowers", "0");
INSERT INTO ImageBundle (adID, coverImagePath, firstImagePath, secondImagePath) VALUES ("5","https://i.pinimg.com/564x/aa/18/4e/aa184e45a9873944816d9ce825fb5a9a.jpg", "https://sunnyside-gardens.com/wp-content/uploads/2012/11/liliumstargazer.jpg", "https://www.americanmeadows.com/media/catalog/product/l/i/lilium-orientalis-oriental-lily-pink-stargazer-garden_2.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=560&width=560&canvas=560:560");