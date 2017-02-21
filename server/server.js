const express = require('express');
const parser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const routes = require('./routes');
const config = require('./example_config');

const app = express();

passport.serializeUser((id, done) => {
  done(null, id);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// set configuration keys for Github authentication via Passport
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID || config.keys.gitHubClientId,
  clientSecret: process.env.GITHUB_SECRET_KEY || config.keys.gitHubSecretKey,
  callbackURL: process.env.GIT_CALLBACK_URL || config.keys.gitCallbackUrl
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      return done(null, profile);
    });
  }
));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 600000 * 3} //30 mins
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '../Client'));
app.use(parser.json());

routes.router(app);

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'),() => {
  console.log(`listening on port: ${app.get('port')}`);
});

module.exports.app = app;
