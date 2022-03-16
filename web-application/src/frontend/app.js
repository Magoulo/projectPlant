const express = require('express')

const app = express()

app.use(express.static('spa'))

app.get("*", function(request, response){
	response.sendFile(__dirname+"/spa/index.html")
})

app.listen(8080)