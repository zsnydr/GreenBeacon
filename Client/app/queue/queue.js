//Queue controller

angular.module('app.queue', [])

.controller('QueueController', ['$scope', 'Tickets', 'Auth', '$interval', function($scope, Tickets, Auth, $interval){

  //call getTickets from Tickets factory
  $scope.data = {};
  var SVGpulse;
  var SVGdot;
 
 //$scope.flag = false;
  $scope.setClass = function (ticketX, ticketY) {
   


      //for (var pulse of SVGpulse) {
        for (var i = 0; i<SVGdot.length; i++) {
           var x = SVGdot[i].parentElement.parentElement.getAttribute('x');
           var y = SVGdot[i].parentElement.parentElement.getAttribute('y');
        //console.log('x', x, 'ticketX', ticketX, 'y', y, 'ticketY', ticketY);
           if (x !== ticketX.toString() && y !== ticketY.toString()) {
             SVGpulse[i].setAttribute('class', 'pulse hiddenPulse');
             SVGdot[i].setAttribute('class', 'dot hiddenDot');
           }
        }
  }  

  $scope.removeClass = function (ticketX, ticketY) {
 


    // var mySVG = document.querySelector('.active1');
    // var mySVG2 = document.querySelector('.active2');
    // mySVG.setAttribute('class', 'pulse');
    // mySVG2.setAttribute('class', 'dot');
    // initializeQueue();
 }

  var initializeQueue = function() {



    Tickets.getTickets()
      .then(function(results){
        console.log("inside initialize ", results)

    SVGpulse = document.getElementsByClassName('pulse');  
    SVGdot = document.getElementsByClassName('dot');

        $scope.data.tickets = results.data.tickets;
        for (var ticket of $scope.data.tickets) {
          if (ticket.userId === results.data.userID) {
            ticket.ismine = true;
          } else {
            ticket.ismine = false;
          }
        }
        $scope.data.claims = results.data.claims;

        for (var claim of $scope.data.claims) {
          if (claim.helpeeId === results.data.userID) {
            alert(claim.user.displayname + ' is on their way!');

            for (var ticket of $scope.data.tickets) {
              if (ticket.claimed && ticket.userId === results.data.userID) {
                ticket.preSolved = true;
              }
            }
            Tickets.eraseClaim(claim)
            .then(function () {
               $scope.data.claims = {};
            })
          }
        }
      })
      .catch(function(error){
        console.error(error);
      })
  }

  $scope.ticket = {};
 // $scope.x = 100;
 // $scope.y = 100;

  $scope.addTicket = function () {

    $scope.ticket.color = '#' + Math.floor(Math.random()*16777215).toString(16);
    //Math.random() * (max - min) + min;

      if ($scope.ticket.location === 'Lecture Hall') {
        $scope.ticket.x = Math.random() * 165 + 25;
        $scope.ticket.y = Math.random() * 50 + 50;

      } else if ($scope.ticket.location === 'Pairing Station') {
        $scope.ticket.x = Math.random() * 165 + 25;
        $scope.ticket.y = Math.random() * 70 + 140;

      } else if ($scope.ticket.location === 'Kitchen') {
        $scope.ticket.x = Math.random() * 165 + 25;
        $scope.ticket.y = Math.random() * 80 + 240;

      } else if ($scope.ticket.location === 'Couch') {
        $scope.ticket.x = Math.random() * 120 + 250;
        $scope.ticket.y = Math.random() * 95 + 230;

      } else if ($scope.ticket.location === 'Senior Zone') {
        $scope.ticket.x = Math.random() * 100 + 270;
        $scope.ticket.y = Math.random() * 240 + 370;
        
      } else if ($scope.ticket.location === 'The Hopper') {
        $scope.ticket.x = Math.random() * 135 + 25;
        $scope.ticket.y = Math.random() * 80 + 470;
        
      } else if ($scope.ticket.location === 'The Dijkstra') {
        $scope.ticket.x = Math.random() * 135 + 25;
        $scope.ticket.y = Math.random() * 65 + 590;
        
      } else if ($scope.ticket.location === 'The Ada') {
        $scope.ticket.x = Math.random() * 80 + 290;
        $scope.ticket.y = Math.random() * 105 + 655;
        
      } else if ($scope.ticket.location === 'Entrance Hall') {
        $scope.ticket.x = Math.random() * 235 + 25;
        $scope.ticket.y = Math.random() * 70 + 690;
      } 

      console.log('TICKET', $scope.ticket)

    Tickets.addTicket($scope.ticket)
    .then(function () {
      $scope.ticket = {};
      initializeQueue();
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  $scope.signout = function () {
    console.log('inside signout')
    Auth.signout();
  }

  $scope.claimTicket = function (ticket) {
    //ticket.claimed = !ticket.claimed;

    Tickets.claimTicket(ticket)
    .then(function () {
      initializeQueue();
    })
    .catch(function (err) {
      console.log(err);
    });

  }

  $scope.solveTicket = function (ticket) {

     Tickets.solveTicket(ticket)
    .then(function () {
      initializeQueue();
    })
    .catch(function (err) {
      console.log(err);
    });
  }


  $scope.unsolveTicket = function (ticket) {

     Tickets.unsolveTicket(ticket)
    .then(function () {
      initializeQueue();
    })
    .catch(function (err) {
      console.log(err);
    });
  }


$interval(initializeQueue, 3000);

}])
