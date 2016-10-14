// basic server
var express = require('express');
var passport = require('passport');
var session = require('express-session');
var GitHubStrategy = require('passport-github2').Strategy;
// Middleware
var parser = require('body-parser');
var authorize = require('./authHelpers.js');
var routes = require('./routes.js');

// var gitClientID = '2bf2f840356d251d928c';
// var gitSecret = 'c606d2126dd0ea186e3dda5d53f1646bf778cc10';
//
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });
//
// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
// });
//
//
// passport.use(new GitHubStrategy({
//     clientID: gitClientID,
//     clientSecret: gitSecret,
//     callbackURL: "http://127.0.0.1:3000/auth/github/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     // asynchronous verification, for effect...
//     process.nextTick(function () {
//
//       // To keep the example simple, the user's GitHub profile is returned to
//       // represent the logged-in user.  In a typical application, you would want
//       // to associate the GitHub account with a user record in your database,
//       // and return that user instead.
//       return done(null, profile);
//     });
//   }
// ));

var app = express();


// Set what we are listening on.

app.set('port', process.env.PORT || 3000);
// Logging and parsing
app.use(parser.json());

// Serve the client files
app.use(express.static(__dirname + '/Client'));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
routes.router(app);
authorize.auth(app);

app.listen(app.get('port'), function(){
  console.log('listening on port: ', app.get('port'))
});


module.exports.app = app;
