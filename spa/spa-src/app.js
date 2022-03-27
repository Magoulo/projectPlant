const express = require('express')

const app = express()
const port = 6001

app.use(express.static(__dirname))

//Spara i sessionStorage samt googla sessionStore
/*
app.use(function (request, response, next) {
		response.setHeader("Access-Control-Allow-Origin", "*")
		response.setHeader("Access-Control-Allow-Methods", "*")
		response.setHeader("Access-Control-Allow-Headers", "*")
		response.setHeader("Access-Control-Expose-Headers", "*")
		next()
	})*/
	
app.get("*", function(request, response){
	response.sendFile(__dirname+"/index.html")
})

app.listen(port, function(){
	console.log(`listening on ${port}!`)
})