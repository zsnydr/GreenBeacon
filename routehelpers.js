
var IDcount = 1;

var tickets = [
  { username: 'Natasha', message: 'HELP ME', location: 'Kitchen', ID: 1, date: new Date(), claimed: false, solved: false },
  { username: 'Alina', message: 'Help with backbone', location: 'Couch', ID: 2, date: new Date(), claimed: true, solved: false },
  { username: 'Conor', message: 'How do you react?', location: 'Pairing', ID: 3, date: new Date(), claimed: false, solved: false },
  { username: 'Zack', message: 'ugh, Grunt', location: 'Lecture Hall', ID: 4, date: new Date(), claimed: true, solved: true }
];

module.exports = {

  isLoggedIn: (req, res, next) => {
    if(req.session && req.session.passport.user.username && req.session.passport.user.provider === 'github'){
      next();
    } else {
      res.redirect('/auth/github');
    }
  },

  terminateSession: (req, res) => {
    console.log('terminateSession');
  },

  getTicketsFunc: (req, res) => {
    console.log('getTicketsFunc');
    res.send(tickets);
    // send all tickets back in res.end
  },

  addToQueue: (req, res) => {
    console.log('addToQueue');
    ticket.push(req.body);
    // increment IDcount???
  },

  tagClaimed: (req, res) => {
    console.log('claimed');
    res.end();

    // find ticket with messageID from req
    // mark it as claimed
  },

  tagSolved: (req, res) => {
    console.log('hello');
    for (let ticket of tickets) {
      if (ticket.ID === req.body.ID) {
        ticket.solved = !ticket.solved;
      }
    }
    // res.send(tickets); ?
  }

};
