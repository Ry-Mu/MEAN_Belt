app.controller('AnswerController', ['$scope', '$routeParams', '$location', 'userFactory', 'questionFactory', 'answerFactory', function($scope, $routeParams, $location, userFactory, questionFactory, answerFactory) {
  $scope.activeUser = null;
  $scope.pleaseLogin = false;
  $scope.currentQuestion = {};
  $scope.newAnswer = {};
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

  questionFactory.showQuestion(function(data){
    if(!data.errors) {
      $scope.currentQuestion = data;
      console.log($scope.currentQuestion);
    }
    else {
      $scope.errors = [`Could not retrieve question id=${$routeParams.id}`]
    }
  }, $routeParams.id);

  $scope.logout = function() {
    userFactory.logout(function(data){
      $scope.pleaseLogin = true;
      $scope.user = data;
      $location.url('/index');
    });
  }
  $scope.cancel = function() {
    $location.url('/questions/'+$routeParams.id);
  }

  $scope.createAnswer = function() {
    $scope.newAnswer.username = $scope.activeUser;
    answerFactory.createAnswer(function(result){
      if(result.errors) {
        $scope.errors = result.errors;
      }
      else {
        $scope.newAnswer = {};
        $location.url('/');
      }
    }, $scope.currentQuestion, $scope.newAnswer);
  }
}]);
