
/**
 * Module dependencies.
 */

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var index = require('./routes/index');
var home = require('./routes/home');
var doc = require('./routes/doc');
var login = require('./routes/login');
var route = require('./routes/route');
var settings = require('./routes/settings');
var Model = require('./model');
// Example route
// var user = require('./routes/user');

var app = express();

// Passport stuff
passport.use(new LocalStrategy(function(username, password, done) {
   new Model.User({username: username}).fetch().then(function(data) {
      var user = data;
      if(user === null) {
         return done(null, false, {message: 'Invalid username or password'});
      } else {
         user = data.toJSON();
         if(!bcrypt.compareSync(password, user.password)) {
            return done(null, false, {message: 'Invalid username or password'});
         } else {
            return done(null, user);
         }
         
      }
   });
}));

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
   new Model.User({username: username}).fetch().then(function(user) {
      done(null, user);
   });
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(cookieParser());
app.use(bodyParser());
app.use(session({secret: 'parkuapp secret code!'}));
app.use(passport.initialize());
app.use(passport.session());
//app.use(express.cookieParser('Intro HCI secret key'));
//app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
// Passport stuff


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// ******************* SETTING UP MYSQL ******************* //
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
// ******************* SETTING UP MYSQL ******************* //

// Add routes here
app.get('/home', function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.redirect('/');
  } else {

    // Get session user.
      var userIden = req.user.get("userId");
      var username = req.user.attributes.username;
      // Get all vehicles of the user.

      con.query('SELECT vehicleId, vehicleName FROM vehicles WHERE userId = ?', userIden,
          function(err, rows) {
              if (err) throw err;
              var homePageJSON = {
                'car': [],
                'message': username
              };

              for (var i = 0; i < rows.length; i++) {
                homePageJSON.car.push({
                  'vehicleName' : rows[i].vehicleName
                });
              }
              res.render('home', homePageJSON);
          }
      );
  }
});

app.get('/', route.signIn);
app.post('/', route.signInPost);
//app.get('/home', home.view);

// signup
// GET
app.get('/signup', route.signUp);
// POST
app.post('/signup', route.signUpPost);

app.get('/doc', route.doc);
app.get('/settings', route.settings);


app.get('/signout', route.signOut);

app.post('/settings', function(req, res) {

  // Get the current user ID
  var userIden = req.user.get("userId");

  // Get the inputted vehicle
  var vehicleInput = req.body.vehicle;

  // Used to insert into vehicles table
  var vehicle = {userId: userIden, vehicleName: vehicleInput, licensePlateNumber: 'abc123'};
  con.query('INSERT INTO vehicles SET ?', vehicle, function(err, res) {
    if (err) throw err;

    //console.log(res.insertId);
  }); 

  res.redirect('/home');
});

app.get('/vehicles', function(req, res) {
    // Get session user.
    var userIden = req.user.get("userId");
    //console.log(userIden);
    // Get all vehicles of the user.
    con.query('SELECT vehicleId, vehicleName FROM vehicles WHERE userId = ?', userIden,
        function(err, rows) {
            if (err) throw err;
            /*
            console.log(rows.length);
            for (i = 0; i < rows.length; i++ ) {
                console.log(rows[i]);
            }
            */
            res.json(rows);
        }
    );
});
// 404 not found
app.use(route.notFound404);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});





