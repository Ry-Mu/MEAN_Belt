app.factory('userFactory', function($http) {
  var factory = {};
  var activeUser = null;

  factory.getActiveUser = function(callback) {
    callback(activeUser);
  }

  factory.logout = function(callback) {
    activeUser = null;
    callback(activeUser);
  }

  factory.login = function(callback, login) {
    var errors = [];
    if(!login) {
      errors.push("Please enter a name!");
    }
    if(!errors.length) {
      activeUser = login;
      console.log("factory sees active user",activeUser)
      callback(activeUser);
    }
    else {
      callback({errors:errors});
    }
  }
  return factory;
});
