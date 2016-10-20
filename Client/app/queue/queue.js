//Queue controller

angular.module('app.queue', [])

.controller('QueueController', ['$scope', 'Tickets', 'Auth', '$interval', function($scope, Tickets, Auth, $interval){

  //call getTickets from Tickets factory
  $scope.data = {};
 //$scope.flag = false;

  var initializeQueue = function() {
    Tickets.getTickets()
      .then(function(results){
        console.log("inside initialize ", results)

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

  $scope.addTicket = function () {
    console.log('inside addTicket module ', $scope.ticket)
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
