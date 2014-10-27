var MySql = require('mysql');
var env = process.env.ENV_VARIABLE || 'development';
var database = require('../database.json')[env];

module.exports = {
	db : MySql.createConnection({
	  host     : process.env.RDS_HOSTNAME,
	  user     : process.env.RDS_USERNAME,
	  password : process.env.RDS_PASSWORD,
	  port 	   : process.env.RDS_PORT
	})
}
