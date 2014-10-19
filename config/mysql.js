var Sequelize = require('sequelize');

// db config
var env = "development";
var config = require('./../database.json')[env];
var password = config.password ? config.password : null;

// initialize database connection
var sequelize = new Sequelize(
	config.database,
	config.user,
	config.password,
	{
		host: config.host,
		logging: console.log,
		define: {
			timestamps: false
		}
	}
);

sequelize
  .authenticate()
  .complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully.')
    }
  })

var crypto = require('crypto');
var DataTypes = require("sequelize");