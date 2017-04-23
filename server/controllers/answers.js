var mongoose = require('mongoose');
var Answer = mongoose.model('Answer');

module.exports = {
  index: function(req, res) {
    Answer.find({}, function(err, answers) {
      if(err) {
        res.json({errors:err})
      } else {
        res.json(answers);
      }
    })
  },
  show: function(req, res) {
    Answer.findOne({_id:req.params.id}, function(err, answer) {
      if(err) {
        console.log("error in root")
        res.json({errors:err})
      } else {
        res.json(answer);
      }
    })
  },
  create: function(req, res) {
    var errors = [];
    var answer = new Answer({answer: req.body.answer, details: req.body.details, username: req.body.username});
    if(!answer.answer) {
      errors.push("Answer is required!");
    }
    else if(answer.answer.length < 5) {
      errors.push("Answer must be 5 or more characters!");
    }
    if(!answer.username) {
      errors.push("You must be logged in to ask a answer!");
    }
    if(!errors.length) {
      answer.save(function(err){
        if(err) {
          console.log('something went wrong in post /submit save');
          res.json({errors:err});
        } else {
          console.log('successfully added a answer!');
          res.json(answer);
        }
      })
    }
    else {
      console.log("ERR:", errors)
      res.json({errors:errors});
    }
  },
  update: function(req, res) {
    console.log("PUT DATA", req.body);
    console.log("req params id:", req.params.id)
    Answer.findOne({_id:req.params.id}, function(err, answer) {
      if(err) {
        console.log("error in UPDATE:id", err);
        res.json({errors:err})
      }
      else {
        answer.answer = req.body.answer;
        answer.details = req.body.details;
        answer.username = req.body.username;
        answer.likes = req.body.likes;
        answer.save(function(err) {
          if(err) {
            console.log('error in UPDATE:id post-find')
            res.json({errors:err});
          }
          else {
            console.log("PUT no errors, Redirecting")
            res.json(answer);
            // res.redirect('back')
          }
        });
      }
    });
  },
  delete: function(req, res) {
    Answer.deleteOne({_id:req.params.id}, function(err, answer) {
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
