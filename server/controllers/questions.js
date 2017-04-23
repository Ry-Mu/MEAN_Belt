var mongoose = require('mongoose');
var Question = mongoose.model('Question');

module.exports = {
  index: function(req, res) {
    Question.find({}).populate('answers').exec(function(err, questions) {
      if(err) {
        res.json({errors:err})
      } else {
        res.json(questions);
      }
    })
  },
  show: function(req, res) {
    Question.findOne({_id:req.params.id}).populate('answers').exec(function(err, question) {
      if(err) {
        console.log("error in root")
        res.json({errors:err})
      } else {
        res.json(question);
      }
    })
  },
  create: function(req, res) {
    var errors = [];
    var question = new Question({name: req.body.name, description: req.body.description, username: req.body.username});
    if(!question.name) {
      errors.push("Name is required!");
    }
    else if(question.name.length < 10) {
      errors.push("Question must be 10 or more characters!");
    }
    if(!question.username) {
      errors.push("You must be logged in to ask a question!");
    }
    if(!errors.length) {
      question.save(function(err){
        if(err) {
          console.log('something went wrong in post /submit save');
          res.json({errors:err});
        } else {
          console.log('successfully added a question!');
          res.json(question);
        }
      })
    }
    else {
      console.log("ERR:", errors)
      res.json({errors:errors});
    }
  },
  update: function(req, res) {
    // console.log("PUT DATA", req.body);
    Question.findOne({_id:req.params.id}, function(err, question) {
      if(err) {
        console.log("error in UPDATE:id")
        res.json({errors:err})
      }
      else {
        question.name = req.body.name;
        question.description = req.body.description;
        question.username = req.body.username;
        question.answers = req.body.answers;
        question.save(function(err) {
          if(err) {
            console.log('error in UPDATE:id post-find')
            res.json({errors:err});
          }
          else {
            console.log("PUT no errors, Redirecting")
            res.json(question);
            // res.redirect('back')
          }
        });
      }
    });
  },
  delete: function(req, res) {
    Question.deleteOne({_id:req.params.id}, function(err, question) {
      if(err) {
        console.log("error in DELETE:id")
        res.json({success:"false", errors:err});
      }
      else {
        res.json({success:"true"})
      }
    });
  }
}
