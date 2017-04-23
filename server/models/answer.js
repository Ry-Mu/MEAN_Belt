var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
  username: {type:String, required:true},
  answer: {type:String, required:true},
  details: {type:String},
  likes: {type:Number, default:0},
})

var Answer = mongoose.model('Answer', AnswerSchema);
