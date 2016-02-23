
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

// Add routes here
//app.get('/', index.view);
app.get('/home', route.home);

app.get('/', route.signIn);
app.post('/', route.signInPost);
//app.get('/home', home.view);

// signup
// GET
app.get('/signup', route.signUp);
// POST
app.post('/signup', route.signUpPost);

app.get('/home', route.home);
app.get('/doc', route.doc);
//app.post('/login', login.verifyUser);


app.get('/signout', route.signOut);

// app.get('/project/:name', project.viewProject);
// Example route
// app.get('/users', user.list);
// 404 not found
app.use(route.notFound404);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});





