var mysql = require('mysql');
var database = require/('database.json')

var db = mysql.createConnection({
	user: database.user,
	password: database.password,
	database: database.database,
	port: database
});
db.connect(function(){
	console.log("MySQL is connected.")
});
