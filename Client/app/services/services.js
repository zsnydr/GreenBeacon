//declare 'Auth' as factory
  //pass in $http object for requests

angular.module('app.services', [])

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

}])