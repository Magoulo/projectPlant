const express = require('express')

const app = express()
const port = 6001

app.use(express.static(__dirname))
console.log("dirname: ", __dirname)


app.get("*", function(request, response){
	console.log("in app get")
	response.sendFile(__dirname+"/index.html")
})

app.listen(port, function(){
	console.log(`listening on ${port}!`)
})