app.controller('LoginController', ['$scope', '$routeParams', '$location', 'userFactory', function($scope, $routeParams, $location, userFactory) {
  $scope.activeUser = null;
  $scope.errors = [];

  $scope.login = function(user) {
    userFactory.login(function(data){
      if(!data.errors) {
        $scope.activeUser = data;
        $location.url('/');
      }
      else {
        $scope.errors = [`Please enter a user name.`]
      }
    }, user);
  }
}]);
