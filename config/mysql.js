var MySql = require('mysql');
var env = process.env.ENV_VARIABLE || 'development';
var database = require('../database.json')[env];

module.exports = {
	db : MySql.createConnection({
	  host     : process.env.RDS_HOSTNAME || "localhost",
	  database : process.env.RDS_DATABASE || "rememberwhenwe",
	  user     : process.env.RDS_USERNAME || "root",
	  password : process.env.RDS_PASSWORD || "root",
	  port 	   : process.env.RDS_PORT || 8889
	})
}
