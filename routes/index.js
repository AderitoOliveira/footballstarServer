var express = require('express');
var router = express.Router();
var serverMysql = require('./servers.js');


/* Validate the user Login - Start */

router.post('/authenticate', async function(req, res, next) {
  userAuthenticate(req, res);
});

/* Validate the user Login - End */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//GET ALL VIDEOS OF THE PLAYER IN THE DATABASE
router.get('/allVideosOfPlayer/:id', function(req, res, next) {
  fetchAllVideosOfPlayer(req, res,);
});

//INSERT VIDEO INFORMATION FOR THE PLAYER IN THE DATABASE
router.post('/insertVideoInfoToDatabase', function(req, res, next) {
  insertVideoInfoToDatabase(req, res);
});

//GET ALL VIDEOS OF THE SELECTED LEVEL OF THE EXERCISES
/* router.get('/getVideosOfExerciseLevel/:id', function(req, res, next) {
  fetchVideosOfExerciseLevel(req, res,);
}); */

//GET ALL VIDEOS OF THE SELECTED LEVEL OF THE EXERCISES
router.get('/getVideosOfExerciseLevel', function(req, res, next) {
  fetchVideosOfExerciseLevel(req, res,);
});


/********************************************************** ADMINISTRATOR FUNCTIONS ************************************************************************************************/

//GET ALL VIDEOS TO REVIEW
router.get('/videosToReview', function(req, res, next) {
  //res.send(JSON.stringify({value: 1}));
  fetchAllVideosToReview(req, res,);
});

module.exports = router;
