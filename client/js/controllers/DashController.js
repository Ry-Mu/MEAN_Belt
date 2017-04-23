app.controller('DashController', ['$scope', '$routeParams', '$location', 'userFactory', 'questionFactory', function($scope, $routeParams, $location, userFactory, questionFactory) {
  $scope.activeUser = null;
  $scope.questions = [];
  $scope.errors = [];
  $scope.pleaseLogin = false;

  userFactory.getActiveUser(function(data) {
    $scope.activeUser = data;
    console.log("dashcontroller sees activeuser:", $scope.activeUser);
    if(!$scope.activeUser) {
      $scope.pleaseLogin = true;
    } else {
      $scope.pleaseLogin = false;
    }
  });

  questionFactory.getQuestions(function(data) {
    if(data.errors) {
      $scope.errors = data;
    }
    else {
      $scope.questions = data;
    }
  });

  $scope.logout = function() {
    userFactory.logout(function(data){
      $scope.pleaseLogin = true;
      $scope.user = data;
      $location.url('/index');
    });
  }

  $scope.show = function(question) {
    $location.url('/question/'+question._id);
  }

  $scope.answer = function(question) {
    $location.url('/question/'+question._id+'/new_answer/');
  }
}]);
