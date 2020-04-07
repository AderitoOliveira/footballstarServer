
var mysql = require('mysql');
var db;

function connectDatabase() {
    if (!db) {
        db = mysql.createConnection({
            host: "127.0.0.1",
            user: "playsocceronline",
            password: "Player@123",
            database: 'playsocceronline',
            port: '3306'
    });

        db.connect(function(err){
            if(!err) {
                console.log('Database is connected!');
            } else {
                console.log('Error connecting database!');
                console.log(err);
            }
        });
    }
    return db;
}

module.exports = connectDatabase();