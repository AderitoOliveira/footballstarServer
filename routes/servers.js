const fs  = require('fs');
var path = require('path');
const jwt = require('jsonwebtoken');
var con = require('./dbconnection.js');
var crypto = require('crypto');
var config = {
  // size of the generated hash
  hashBytes: 32,
  // larger salt means hashed passwords are more resistant to rainbow table, but
  // you get diminishing returns pretty fast
  saltBytes: 16,
  // more iterations means an attacker has to take longer to brute force an
  // individual password, so larger is better. however, larger also means longer
  // to hash the password. tune so that hashing the password takes about a
  // second
  iterations: 872791
};

var keysPath = process.cwd();
var privateKEY = fs.readFileSync('./keys/private.key', 'utf8');
var publicKEY = fs.readFileSync('./keys/public.key', 'utf8');

const passSalt = 'Entre_Braga_E_Nova_Iorque';
const jwtExpirySeconds = 600;

/* Validate the user Login - Start */

//GET USER INFO
getUserInfoDB = function(req, callback) {

    return new Promise(async function(resolve, reject) {
        console.log("INSIDE getUserInfo");
        try {
        con.connect(function(err) {
        let result = con.query('SELECT PLAYER_ID, FIRST_NAME, LAST_NAME, EMAIL, PASSWORD, ITERATIONS, ROLE FROM users where EMAIL = ?', [req.body.username], function(err, rows) {
                if (err) {
                    throw err;
                } else
                console.log("Return User information"); 
                resolve(rows);
            });
        });
        } catch (err) {
        console.log('Error occurred', err);
        reject(err);
        } 
    });
}

userAuthenticate =  async function (req, callback) {

    let user = await getUserInfoDB(req, callback);

    //console.log(user);

    username             = user[0].USERNAME;
    passwordFromDatabase = user[0].PASSWORD; 
    user_role            = user[0].ROLE;
    passwordFromRequest  = req.body.password;

    console.log("username: " + username);
    const key = crypto.pbkdf2Sync(passwordFromRequest, passSalt, 100000, 64, 'sha512');
    console.log("key: " + key.toString('hex'));
    console.log("pas: " + passwordFromDatabase);


    if(passwordFromDatabase === key.toString('hex')) {
        console.log("username != null : " + username);
        console.log(user);

        var token = jwt.sign({ user: username }, privateKEY, {
            issuer:  'playsoceronline',
            subject:  'player',
            algorithm: 'RS256',
            expiresIn: jwtExpirySeconds
          });
        console.log('token:' +  token)

        user_authentication = {
            user : {
                player_id   : user[0].PLAYER_ID,
                role        : user_role,
                firstName  : user[0].FIRST_NAME,
                lastName   : user[0].LAST_NAME,
                token       : token
            },
            auth_message : "Success"   

        }

        //callback.setHeader('Status', ['Success']);
        callback.send(JSON.stringify(user_authentication));
        callback.end();
    } else {

        user_authentication = {
            user : {
                player_id   : user[0].PLAYER_ID,
                role        : user_role,
                token       : token
            },
            auth_message : "Error"   

        }

        callback.send(JSON.stringify(user_authentication));
        callback.end();
    }
}
/* Validate the user Login - END */


//GET VIDEOS OF THE PLAYER
fetchAllVideosOfPlayer = function(req, callback) {
    con.query('select * from player_videos where player_id = ?', [req.params.id] , function(err, rows) {
        if (err) {
            throw err;
        } else
        callback.setHeader('Content-Type', 'application/json');
        callback.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        callback.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        callback.end(JSON.stringify(rows));
        callback = rows;
        console.log("GET VIDEOS OF THE PLAYER");   

    });

}

//INSERT VIDEO INFORMATION FOR THE PLAYER IN THE DATABASE
insertVideoInfoToDatabase = function(req, callback) {
    con.query('insert into player_videos SET ?', req.body , function(err, rows) {
        if (err) {
            throw err;
        } else
        callback.setHeader('Content-Type', 'application/json');
        callback.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        callback.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        callback.end(JSON.stringify(rows));
        callback = rows;
        console.log("INSERT VIDEO INFORMATION FOR THE PLAYER IN THE DATABASE");   

    });

}

//GET ALL VIDEOS OF THE SELECTED LEVEL OF THE EXERCISES
fetchVideosOfExerciseLevel = function(req, callback) {
    con.query('select * from exercises_videos where EXERCISE_LEVEL = ?', [req.params.id] , function(err, rows) {
        if (err) {
            throw err;
        } else
        callback.setHeader('Content-Type', 'application/json');
        callback.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        callback.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        callback.end(JSON.stringify(rows));
        callback = rows;
        console.log("GET VIDEOS OF THE PLAYER");   

    });

}

//GET ALL VEHICLES
fetchAllVehicles = function(data, callback) {
    con.query('SELECT * FROM VEHICLES', function(err, rows) {
        if (err) {
            throw err;
        } else
        callback.setHeader('Content-Type', 'application/json');
        callback.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        callback.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        callback.end(JSON.stringify(rows));
        callback = rows;
        console.log("GET ALL PLAYERS");   

    });

}