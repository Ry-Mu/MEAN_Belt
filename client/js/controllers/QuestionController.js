app.controller('QuestionController', ['$scope', '$routeParams', '$location', 'userFactory', 'questionFactory', function($scope, $routeParams, $location, userFactory, questionFactory) {
  $scope.activeUser = null;
  $scope.pleaseLogin = false;
  $scope.newQuestion = {};
  $scope.errors = [];

  userFactory.getActiveUser(function(data) {
    $scope.activeUser = data;
    console.log("questioncontroller sees activeuser:", $scope.activeUser);
    if(!$scope.activeUser) {
      $scope.pleaseLogin = true;
    } else {
      $scope.pleaseLogin = false;
    }
  });

  $scope.logout = function() {
    userFactory.logout(function(data){
      $scope.pleaseLogin = true;
      $scope.user = data;
      $location.url('/index');
    });
  }

  $scope.cancel = function() {
    $location.url('/');
  }


  $scope.createQuestion = function() {
    $scope.newQuestion.username = $scope.activeUser;
    questionFactory.createQuestion(function(result){
      if(result.errors) {
        $scope.errors = result.errors;
      }
      else {
        $scope.newQuestion = {};
        $location.url('/')
      }
    }, $scope.newQuestion);
  }
}]);
