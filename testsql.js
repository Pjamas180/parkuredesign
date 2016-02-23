var mysql = require("mysql");

// First you need to create a connection to the db
var con = mysql.createConnection({
  host: 'jw0ch9vofhcajqg7.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user: 'hacd9bv6o2fyqb9a',
  password: 'w5c6dw6vb9blc07b',
  database: 'ifevrxznxvctquex'
});

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});



con.query('SELECT * FROM vehicles', function(err, rows) {
  if (err) throw err;

  console.log(rows);
});
/**
var user = "testt";
  con.query('SELECT users.userId FROM users WHERE users.username = ?', user, function(err, rows) {
    if (err) throw err;
    console.log(rows[0].userId);
  });

var vehicle = {userId: '7', vehicleName: 'Honda', licensePlateNumber: 'abc123'};
con.query('INSERT INTO vehicles SET ?', vehicle, function(err, res) {
  if (err) throw err;

  console.log(res.insertId);
}); */

con.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});

