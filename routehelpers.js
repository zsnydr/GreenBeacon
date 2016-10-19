
// var IDcount = 1;

// var tickets = [
//   { username: 'Natasha', message: 'HELP ME', location: 'Kitchen', ID: 1, date: new Date(), claimed: false, solved: false },
//   { username: 'Alina', message: 'Help with backbone', location: 'Couch', ID: 2, date: new Date(), claimed: false, solved: false },
//   { username: 'Conor', message: 'How do you react?', location: 'Pairing', ID: 3, date: new Date(), claimed: false, solved: false },
//   { username: 'Zack', message: 'ugh, Grunt', location: 'Lecture Hall', ID: 4, date: new Date(), claimed: false, solved: false }
// ];

var pg = require('pg');
var Sequelize = require('sequelize');

//Models
var User = require('./db/schema').User;
var Ticket = require('./db/schema').Ticket;
var Claim = require('./db/schema').Claim;


//establish database connection for querying
var db = new Sequelize(process.env.DATABASE_URL, {
 dialect: 'postgres'
});

db
 .authenticate()
 .then(function(err) {
   console.log('Connection established');
 })
 .catch(function(err) {
   console.log('Unable to connect: ', err);
 });



module.exports = {

  newUser: (req, res, next/*, username, cb*/) => {
    User.findOrCreate({ where: { username: username } })
      .then(function(user) {
        console.log('USER ', user);
        req.session.cookie.userID = user.id;
        console.log('USER_ID ', req.session.cookie);
        next();
      });
  },

  isLoggedIn: (req, res, next) => {
    //console.log('SESSION ', req.session)
    if(req.session && req.session.passport && req.session.passport.user.username && req.session.passport.user.provider === 'github'){
      next();
    } else {
      res.end('failed');
    }
  },

  terminateSession: (req, res) => {
    console.log('terminateSession');
    req.session.destroy();
    res.redirect('/#/signin');
  },

  getTickets: (req, res) => {
    console.log('getTickets');

    Ticket.findAll({})
          .then(function(tickets){
              res.send(tickets);
          })
  },

  addToQueue: (req, res) => {
    console.log('addToQueue', req.body);
  //  console.log('addtoq ', req.session.passport.user.displayName);

    tickets.push({
      username: req.session.passport.user.displayName,
      message: req.body.message,
      location: req.body.location,
      ID: IDcount,
      date: new Date(),
      claimed: false,
      solved: false
    });

    IDcount++;

    res.json(tickets);

  },

  tagClaimed: (req, res) => {
    console.log('claimed');
    for (var ticket of tickets) {
      if (ticket.ID === req.body.ID) {
        ticket.claimed = !ticket.claimed;
      }
    }
    res.json(tickets);
  },

  tagSolved: (req, res) => {
    console.log('solved');
    for (var ticket of tickets) {
      if (ticket.ID === req.body.ID) {
        ticket.solved = true;
      }
    }
    res.end(tickets);
  }

};
