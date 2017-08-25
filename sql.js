let mysql = require('mysql');

var connection = mysql.createConnection('mysql://root:root@localhost:8889/nodeMeetup');

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


connection.query('SELECT * FROM account', function(err, rows, fields) {
    connection.end();
    if (!err)
        console.log(rows);
    else
        console.log('Error while performing Query.');
});


connection.end();