app.factory('answerFactory', function($http) {
  var factory = {};
  var answers = [];
  var answer = {};

  factory.showAnswer = function(id, callback) {
    $http.get('/answers/'+id,{}).then(function(response){
      console.log("factory rcv response:",response);
      answer = response.data;
      callback(answer);
    }).catch(function(error) {
      console.log("Error: could not load /answers", error);
      callback({errors:errors});
    });
  }

  factory.getAnswers = function(callback) {
    $http.get('/answers',{}).then(function(response){
      answers = response.data;
      callback(answers);
    }).catch(function(error) {
      console.log("Error: could not load /answers", error);
      callback({errors:errors});
    });
  }
  factory.deleteAnswer = function(callback, answer) {
    var errors = [];
    // friends.splice(friends.indexOf(friend), 1);
    $http.delete('/answers/'+answer._id, {}).then(function(response) {
      $http.get('/answers',{}).then(function(response){
        answers = response.data;
        errors = response.errors;
        callback(errors, answers);
      });
    }, function() {
      console.log("Error in answerFactory.deleteAnswer!");
    });
  }
  factory.updateAnswer = function(callback, answer) {
    console.log("factory attempting to send answer:",answer);
    $http.put('/answers/'+answer._id, answer).then(function(response) {
      console.log(response);
      callback(response.data);
    }).catch(function() {
      console.log("error!");
    })
  }
  factory.createAnswer = function(callback, question, answer) {
    $http.post('/answers',answer).then(function(response){
      console.log("returned:",response.data);
      if(!response.data.errors) {
        var id = response.data._id;
        question.answers.push(id);
          $http.put('/questions/'+question._id, question).then(function(response) {
            callback(response);
          }, function(response) {
            console.log('put attempt failed', response);
          })
        callback(response.data);
      }
      else {
        callback(response.data);
      }
    }).catch(function(error) {
      console.log(error);
    });
  }
  return factory;
});
