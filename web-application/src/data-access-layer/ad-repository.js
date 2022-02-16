const db = require('./db')

exports.getAllAds = function(callback){
	
	const query = `SELECT * FROM Ad ORDER BY adID`
	const values = []
	
	db.query(query, values, function(error, Ad){
		if(error){
			callback(['databaseError'], null)
		}else{
			callback([], Ad)
		}
	})
	
}