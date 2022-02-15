const express = require('express')

const router = express.Router()

router.get("/", function(request, response){
	console.log("length is: ",'$2a$13$qMvfkKBY.ixh6d48lRN7M.qbkJD1PZWdGzRo2h1eZwYYBzw3F0zJG'.length)
	response.render("home.hbs")
})

router.get("/about", function(request, response){
	response.render("about.hbs")
})

router.get("/contact", function(request, response){
	response.render("contact.hbs")
})

module.exports = router