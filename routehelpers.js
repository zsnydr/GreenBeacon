
var IDcount = 1;

var tickets = [
  { username: 'Natasha', message: 'HELP ME', location: 'Kitchen', ID: 1, date: new Date(), claimed: false, solved: false },
  { username: 'Alina', message: 'Help with backbone', location: 'Couch', ID: 2, date: new Date(), claimed: true, solved: false },
  { username: 'Conor', message: 'How do you react?', location: 'Pairing', ID: 3, date: new Date(), claimed: false, solved: false },
  { username: 'Zack', message: 'ugh, Grunt', location: 'Lecture Hall', ID: 4, date: new Date(), claimed: true, solved: true }
];

module.exports = {

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
    res.send(tickets);
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
    console.log('session', req.session)
    console.log('body', req.body)
    for (let ticket of tickets) {
      if (ticket.ID === req.body.ID) {
        ticket.claimed = !ticket.claimed;
      }
    }
    res.json(tickets);
  },

  tagSolved: (req, res) => {
    console.log('solved');
    for (let ticket of tickets) {
      if (ticket.ID === req.body.ID) {
        ticket.solved = true;
      }
    }
    res.end(tickets);
  }

};
