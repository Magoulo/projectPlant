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

/* LÄ*gg till PK och col Status */
CREATE TABLE IF NOT EXISTS Bid (
  bidID INT NOT NULL AUTO_INCREMENT,
  userID INT NOT NULL,
  adID INT NOT NULL,
  date DATETIME,
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
  
-- Dummy data for testing.
INSERT INTO UserAccount (username, passwordHash) VALUES ("moo", "123");
INSERT INTO User (userAccountID,firstName,lastName,email,phoneNumber,city) VALUES ("1","Sabin","mooo","Sabimooon@com","555-123","GBG");

INSERT INTO Ad (userID, title, latinName, description, isClosed) VALUES ("1","well maintained Monstera", "Monstera deliciosa","well maintained with roots in mullis", "0");
INSERT INTO ImageBundle (adID, coverImagePath, firstImagePath, secondImagePath) VALUES ("1","variegata-1.jpg", "monstera-propagation-in-water-scaled.jpg", "catesthill-propogating-monstera-plant-4.jpg");
INSERT INTO Ad (userID, title, latinName, description, isClosed) VALUES ("1","Stunning Begonias", "Begonia maculata","Tradeing cuttings with good root development", "0");
INSERT INTO ImageBundle (adID, coverImagePath, firstImagePath, secondImagePath) VALUES ("2","9dbis4pt2o751.jpg", "maculata-4-768x1024.jpg", "PXL_20210501_190619891.jpg");


INSERT INTO UserAccount (username, passwordHash) VALUES ("rita", "123");
INSERT INTO User (userAccountID,firstName,lastName,email,phoneNumber,city) VALUES ("2","Rita","Muggeldottir","RitaMuggeldottir@com","555-00","Stchaan");

INSERT INTO Ad (userID, title, latinName, description, isClosed) VALUES ("2","Cashtree", "Pachira aquatica","Moneytree that keeps droppin bills", "0");
INSERT INTO ImageBundle (adID, coverImagePath, firstImagePath, secondImagePath) VALUES ("3","krukvaxter_images_bilder_pachira_aquatica.jpg", "il_300x300.1012912306_dpeg.jpg", "strandkastanj-538318.jpg");

INSERT INTO UserAccount (username, passwordHash) VALUES ("slugger", "123");
INSERT INTO User (userAccountID,firstName,lastName,email,phoneNumber,city) VALUES ("3","Slugs","Slugsen","SluggiSlug@com","555-0222","JKPG");

INSERT INTO Ad (userID, title, latinName, description, isClosed) VALUES ("3","Stargazer lily", "Lilium orientalis 'Stargazer'","Flowers for both outdoors and indoors!", "0");
INSERT INTO ImageBundle (adID, coverImagePath, firstImagePath, secondImagePath) VALUES ("4","aa184e45a9873944816d9ce825fb5a9a.jpg", "liliumstargazer.jpg", "lilium-orientalis-oriental-lily-pink-stargazer-garden_2.jpg");
INSERT INTO Ad (userID, title, latinName, description, isClosed) VALUES ("3","Friendly cacti", "Echinopsis pachanoi'","Good for toothpicks", "0");
INSERT INTO ImageBundle (adID, coverImagePath, firstImagePath, secondImagePath) VALUES ("5","trichocereus_pachanoi.jpg", "trichocereus-pachanoi-echinopsis-pachanoi-mini.jpg", "sanpedro2.jpg");

INSERT INTO UserAccount (username, passwordHash) VALUES ("qwe", "123");
INSERT INTO User (userAccountID,firstName,lastName,email,phoneNumber,city) VALUES ("4","qwe","qwe","qweg@com","555-0222","qwecity");

INSERT INTO Ad (userID, title, latinName, description, isClosed) VALUES ("4","Gras tree", "Xanthorrhoea","Tradeing very rare Grass tree cuttings. Grass tree is native to the bush in Austalia and very rare outside the continent. I want to trade my cuttings for other ultra rare species", "0");
INSERT INTO ImageBundle (adID, coverImagePath, firstImagePath, secondImagePath) VALUES ("6","2015-08-25 13.30.02.jpg", "grass-tree-4-heads.jpg", "IMG_8737.jpg");

INSERT INTO Bid(userID, adID, date, imagePath, message, status) VALUES ("2", "4", "2022-02-16", "no-image.png", "Hi I would like to buy your Lillies","Accepted");
INSERT INTO Bid(userID, adID, date, imagePath, message, status) VALUES ("2", "4", "2022-02-16", "no-image.png", "Jag har saab bror","Declined");
INSERT INTO Bid(userID, adID, date, imagePath, message, status) VALUES ("2", "4", "2022-02-16", "no-image.png", "kommer ta dom","Declined");
INSERT INTO Bid(userID, adID, date, imagePath, message, status) VALUES ("4", "4", "2022-02-16", "no-image.png", "those look supreme! trade agaisnt monstera? ","Pending");
INSERT INTO Bid(userID, adID, date, imagePath, message, status) VALUES ("2", "4", "2022-02-16", "no-image.png", "Interesting Lillies","Pending");
INSERT INTO Bid(userID, adID, date, imagePath, message, status) VALUES ("2", "5", "2022-02-16", "no-image.png", "Ooooh want some for appetizers ","Pending");
INSERT INTO Bid(userID, adID, date, imagePath, message, status) VALUES ("1", "5", "2022-02-16", "no-image.png", "I want cactus","Pending");

INSERT INTO Bid(userID, adID, date, imagePath, message, status) VALUES ("1", "2", "2022-02-22", "no-image.png", "Hi I would like to buy your Moneytree","Pending");
INSERT INTO Bid(userID, adID, date, imagePath, message, status) VALUES ("3", "1", "2022-02-22", "no-image.png", "I am takeing the monstera with me","Pending");
INSERT INTO Bid(userID, adID, date, imagePath, message, status) VALUES ("1", "3", "2022-02-11", "no-image.png", "I wanna trade that for this","Pending");
INSERT INTO Bid(userID, adID, date, imagePath, message, status) VALUES ("1", "4", "2022-02-27", "no-image.png", "Sling som lillies my way","Pending");
