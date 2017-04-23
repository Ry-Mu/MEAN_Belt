app.controller('ShowQuestionController', ['$scope', '$routeParams', '$location', 'userFactory', 'answerFactory', 'questionFactory', function($scope, $routeParams, $location, userFactory, answerFactory, questionFactory) {
  $scope.activeUser = null;
  $scope.pleaseLogin = false;
  $scope.currentQuestion = {};
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
  function refreshQuestion() {
    questionFactory.showQuestion(function(data){
      if(!data.errors) {
        $scope.currentQuestion = data;
        console.log($scope.currentQuestion);
        for(var answer in $scope.currentQuestion.answers) {
          answer.sortCount = $scope.currentQuestion.answers.length;
        }
      }
      else {
        $scope.errors = [`Could not retrieve question id=${$routeParams.id}`]
      }
    }, $routeParams.id);
  }
  refreshQuestion();

  $scope.logout = function() {
    userFactory.logout(function(data){
      $scope.pleaseLogin = true;
      $scope.user = data;
      $location.url('/index');
    });
  }


  $scope.like = function(answer) {
    answer.likes++;
    answerFactory.updateAnswer(function(result){
      if(result.errors) {
        $scope.errors = result.errors;
      }
      else {
        console.log("answer updated!");
        refreshQuestion();
      }
    }, answer);
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
