var MySql = require('mysql');
var env = process.env.ENV_VARIABLE || 'development';
var database = require('../database.json')[env];

module.exports = {
		db : MySql.createConnection({
		user: database.user,
		password: database.password,
		database: database.database,
		port: database.port
	})
}
