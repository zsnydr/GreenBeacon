//signin controller
  //signin function attached to scope
  //trigger Auth.signin

angular.module('app.auth', [])

.controller('AuthController', ['$scope', 'Auth', function($scope, Auth){

  $scope.signin = function(){
    Auth.signin()
    .then(function(resp){
      console.log('CLIENT SIDE:', resp);
    })
    .catch(function(error){
      console.error(error);
    })
  }

}])