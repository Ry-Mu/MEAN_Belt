var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
  name: {type: String, required: true, minlength:10},
  description: {type: String},
  answers: [{type: mongoose.Schema.Types.ObjectId, ref: "Answer"}],
  username: {type: String, required: true},
}, {timestamps: true});

var Question = mongoose.model('Question', QuestionSchema);
