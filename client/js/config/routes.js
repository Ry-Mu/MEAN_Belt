var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/dashboard.html',
    controller: 'DashController',
  })
  .when('/index', {
    templateUrl: 'partials/login.html',
    controller: 'LoginController',
  })
  .when('/new_question', {
    templateUrl: 'partials/new_question.html',
    controller: 'QuestionController',
  })
  .when('/question/:id', {
    templateUrl: 'partials/show_question.html',
    controller: 'ShowQuestionController',
  })
  .when('/question/:id/new_answer', {
    templateUrl: 'partials/new_answer.html',
    controller: 'AnswerController',
  })
  .otherwise({
    redirectTo: '/'
  })
});

//make app module
//route .when - tells it what we want to do on different routes
