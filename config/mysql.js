var mysql = require('mysql');

var user = process.env.DB_USER || 'root';
var password = process.env.DB_PASSWORD || 'root';


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : user,
  password : password
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('MySQL is connected.');
});

connection.end();