var mysql = require('mysql');
const conn = mysql.createConnection({
    host: '10.10.2.21',
    user: 'dbuser',
    password: 'dbuser',
    database: 'inventory'
  })
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;