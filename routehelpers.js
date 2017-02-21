const pg = require('pg');
const Sequelize = require('sequelize');

// postgres models
const { User, Ticket, Claim } = require('./db/schema');

// establish database connection for querying
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/beacon', {
  dialect: 'postgres'
});

db.authenticate()
  .then(() => {
    console.log('Connection to Postgres DB established');
  })
  .catch((err) => {
    console.log(`Unable to connect to Postgres DB: ${err}`);
  });


module.exports = {
  // if the current user does not exist in the users table, create a new record,
  // then retrieve the user's information
  newUser: (req, res, next) => {
    User.findOrCreate({ where: { username: req.session.passport.user.username, displayname: req.session.passport.user.displayName } })
    .then((user) => {
      req.session.userID = user[0].dataValues.id;
      next();
    });
  },

  // middleware that validates the user is currently logged in by analyzing the session
  isLoggedIn: (req, res, next) => {
    if(req.session && req.session.passport && req.session.passport.user.username && req.session.passport.user.provider === 'github') {
      next();
    } else {
      res.end('failed');
    }
  },

  terminateSession: (req, res) => {
    req.session.destroy();
    res.redirect('/#/signin');
  },

  // query for all tickets and claims that exist in DB and send to client
  getTickets: (req, res) => {
    Ticket.findAll({ include: [User] })
    .then((tickets) => {
      Claim.findAll({ include: [User, Ticket] })
        .then((claims) => {
          res.send({ tickets: tickets, claims: claims, userID: req.session.userID });
        });
    });
  },

  // create a new ticket instance and add it to the tickets table
  addToQueue: (req, res) => {
    Ticket.create({ message: req.body.message, location: req.body.location, x: req.body.x, y: req.body.y, color: req.body.color, userId: req.session.userID })
    .then(() => {
      Ticket.findAll({});
    })
    .then((tickets) => {
      res.json(tickets);
    });
  },

  // mark the given ticket as claimed in the tickets table,
  // then add a new claim to the claims table
  tagClaimed: (req, res) => {
    Ticket.find({ where: { id: req.body.id } })
    .then((ticket) => {
      ticket.update({ claimed: true });
    })
    .then(() => {
      Claim.create({ userId: req.session.userID, ticketId: req.body.id, helpeeId: req.body.userId });
    })
    .then(() => {
      res.end();
    });
  },

  // delete the given claim from the claims table,
  // then flag the corresponding ticket as 'preSolved'
  eraseClaim: (req, res) => {
    Claim.destroy({ where: { id: req.body.id } })
    .then(() => {
      Ticket.find({ where: { id: req.body.ticketId } });
    })
    .then((ticket) => {
      ticket.update({ preSolved: true } );
    })
    .then(() => {
      res.end();
    });
  },

  // flag the given ticket as solved in the tickets table
  tagSolved: (req, res) => {
    Ticket.find({ where: { id: req.body.id } })
    .then((ticket) => {
      ticket.update({ solved: true });
    })
    .then(() => {
      res.end();
    });
  },

  // flag the given ticket as not solved in the tickets table
  tagUnSolved: (req, res) => {
    Ticket.find({ where: { id: req.body.id } })
    .then((ticket) => {
      ticket.update({ preSolved: false, claimed: false });
    })
    .then(() => {
      res.end();
    });
  }
};
