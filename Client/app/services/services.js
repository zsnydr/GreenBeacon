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
  }

  return {
    getTickets: getTickets
  }

}])


.factory('Auth', ['$http', '$window', function($http, $window){

  var signin = function() {
    $window.location = '/auth/github';
    // return $http({
    //   method: 'GET',
    //   url: '/signin',
    //   headers: {'Access-Control-Allow-Origin': '*'}
    //
    // .then(function(resp){
    //   console.log('response: ',resp);
    //   return resp;
    // })
  }

  return {
    signin: signin
  }

}])
