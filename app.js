var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
//FILE UPLOAD IMPORTS
const multer = require('multer');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* app.use(cors({
  origin: 'http://localhost:4200'
})); */

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

/*******************************************************  FILE IMPORT SETTINGS   *****************************************************/

const PATH = './uploads';

/* let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, PATH)
  },
  filename: function (req, file, cb) {
    //cb(null, file.originalname + '-' + Date.now())
    cb(null, file.originalname)
  }
}) */ // A FUNCIONAR

const storagePlayerExercices = multer.diskStorage({
  destination: (req, file, cb) => {
    const player_id = req.params.player_id
    const dir = './uploads/' + 'player_' + player_id
    fs.exists(dir, exist => {
      if (!exist) {
        return fs.mkdir(dir, error => cb(error, dir))
      }
      return cb(null, dir)
    })
  },
  filename: (req, file, cb) => {
    const client_id = req.params.client_id
    cb(null, file.originalname)
    //cb(null, 'UserId-' + client_id + `-Image-${Date.now()}.mp4`)
    //cb(null, 'UserId-Image-${Date.now()}.png')

  }

})

let uploadPlayerExercices = multer({
  storage: storagePlayerExercices
});


// POST File
app.post('/api/upload/:player_id', uploadPlayerExercices.single('image'), function (req, res) {
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false
    });

  } else {
    console.log('req.file: ' + req.file);
    console.log('File is available!');
    return res.send({
      success: true
    })
  }
});

app.get('/video/:player_id/:video_name', function (req, res) {

  try {

    var player = 'player_' + req.params.player_id;
    var video = req.params.video_name;
    const path = './uploads/' + player + '/' + video //'/dribles.mp4'
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1]
        ? parseInt(parts[1], 10)
        : fileSize - 1

      const chunksize = (end - start) + 1
      const file = fs.createReadStream(path, { start, end })
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }

      res.writeHead(206, head)
      file.pipe(res)
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }

      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }


  } catch (error) {
    res.writeHead(404, error)
    res.end()
    return
  }

});


app.get('/exercisesVideo/:level_id/:video_name', function (req, res) {

  try {
    var exercise_level = req.params.level_id;
    var video = req.params.video_name;
    const path = './uploads/exercises_videos/' + 'level_' + exercise_level + '/' + video
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1]
        ? parseInt(parts[1], 10)
        : fileSize - 1

      const chunksize = (end - start) + 1
      const file = fs.createReadStream(path, { start, end })
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }

      res.writeHead(206, head)
      file.pipe(res)
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }

      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }

  } catch (error) {
    res.writeHead(404, error)
    res.end()
    return
  }

});

/*******************************************************   *****************************************************/


app.use('/', indexRouter);
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;

  res.status(err.statusCode).send(err.message);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
