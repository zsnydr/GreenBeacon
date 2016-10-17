
var IDcount = 1;

var tickets = [
  { username: 'Natasha', message: 'HELP ME', location: 'Kitchen', ID: 1, date: new Date(), claimed: false, solved: false },
  { username: 'Alina', message: 'Help with backbone', location: 'Couch', ID: 2, date: new Date(), claimed: true, solved: false },
  { username: 'Conor', message: 'How do you react?', location: 'Pairing', ID: 3, date: new Date(), claimed: false, solved: false },
  { username: 'Zack', message: 'ugh, Grunt', location: 'Lecture Hall', ID: 4, date: new Date(), claimed: true, solved: true }
];

module.exports = {

  authfunction: (req, res) => {
    console.log('authfunction')
  },

  terminateSession: (req, res) => {
    console.log('terminateSession');
  },

  getTicketsFunc: (req, res) => {
    console.log('getTicketsFunc');
    // send all tickets back in res.end
  },

  addToQueue: (req, res) => {
    console.log('conor');
    // pull username, message, and location from req.body and IDcount
    // build ticket object
    // push ticket to messages
    // increment IDcount
  },

  tagClaimed: (req, res) => {
    console.log('claimed');
    // find ticket with messageID from req
    // mark it as claimed
  },

  tagSolved: (req, res) => {
    console.log('hello');
  }

}
