//declare 'Auth' as factory
  //pass in $http object for requests

angular.module('app.services', [])

//Tickets factory
  //retrieves ticket objects from server via GET request
.factory('Tickets', ['$http', function($http){

  var getTickets = function() {
    return $http({
      method: 'GET',
      url: '/tickets'
    })
    .then(function(resp){
      return resp;
    })
  };

  var addTicket = function (ticket) {
    return $http({
      method: 'POST',
      url: '/tickets',
      data: ticket
    });
  };

  return {
    getTickets: getTickets,
    addTicket: addTicket
  }

}])


.factory('Auth', ['$http', function($http){

  var signin = function() {
    return $http({
      method: 'GET',
      url: '/auth/github'
    })
    .then(function(resp){
      return resp;
    })
  }

  return {
    signin: signin
  }

}])
