var helpers = require('./helpers');
var passport = require('passport');
module.exports.router = function(app){

app.get('/signin', authfunction);
app.get('/signout', terminateSession)
app.get('/auth/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }),
    function(req, res){
      // The request will be redirected to GitHub for authentication, so this
      // function will not be called.
    });

app.get('/callback',
    passport.authenticate('github', { failureRedirect: '/session' }),
    (req, res) => {
      console.log('SESSION:', req.session);
      res.redirect('/');
    });
app.get('/tickets', getTicketsFunc);


app.post('/tickets', addToQueue);


app.put('/claimed', tagClaimed);
app.put('/solved', tagSolved);
}
