//Signin controller
angular.module('app.auth', [])
.controller('AuthController', ['$scope', 'Auth', function($scope, Auth) {
  $scope.signin = () => {
    Auth.signin();
  };
}]);
