app.factory('questionFactory', function($http) {
  var factory = {};
  var questions = [];
  var question = {};

  factory.showQuestion = function(callback, id) {
    $http.get('/questions/'+id,{}).then(function(response){
      console.log("factory rcv response:",response);
      question = response.data;
      callback(question);
    }).catch(function(errors) {
      console.log("Error: could not load /questions", errors);
      callback({errors:errors});
    });
  }

  factory.getQuestions = function(callback) {
    $http.get('/questions',{}).then(function(response){
      questions = response.data;
      callback(questions);
    }).catch(function(error) {
      console.log("Error: could not load /questions", error);
      callback({errors:errors});
    });
  }
  factory.deleteQuestion = function(callback, question) {
    var errors = [];
    // friends.splice(friends.indexOf(friend), 1);
    $http.delete('/questions/'+question._id, {}).then(function(response) {
      $http.get('/questions',{}).then(function(response){
        questions = response.data;
        errors = response.errors;
        callback(errors, questions);
      });
    }, function() {
      console.log("Error in questionFactory.deleteQuestion!");
    });
  }
  factory.createQuestion = function(callback, question) {
    $http.post('/questions',{name: question.name, description: question.description, username:question.username}).then(function(response){
      console.log("returned:",response.data);
      callback(response.data);
    }).catch(function(error) {
      console.log(error);
    });
  }
  return factory;
});
