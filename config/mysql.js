var MySql = require('mysql');
var env = process.env.ENV_VARIABLE || 'development';
var database = require('../database.json')[env];

module.exports = {
		db : MySql.createConnection({
			host: process.env.RDS_HOSTNAME || database.host,
			user: process.env.RDS_USERNAME || database.user,
			password: process.env.RDS_PASSWORD || database.password,
			port: process.env.RDS_PORT || database.port
	})
}
