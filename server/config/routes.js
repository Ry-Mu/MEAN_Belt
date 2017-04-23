var questions = require('../controllers/questions.js');
var answers = require('../controllers/answers.js');

module.exports = function(app){
  app.get('/questions', function(req, res) {
    questions.index(req, res); });
  app.get('/questions/:id', function(req, res) {
    questions.show(req, res); });
  app.post('/questions', function(req, res) {
    questions.create(req, res); });
  app.put('/questions/:id', function(req, res){
    questions.update(req, res); });
  app.delete('/questions/:id', function(req, res) {
    questions.delete(req, res); });
  app.get('/answers', function(req, res) {
    answers.index(req, res); });
  app.get('/answers/:id', function(req, res) {
    answers.show(req, res); });
  app.post('/answers', function(req, res) {
    answers.create(req, res); });
  app.put('/answers/:id', function(req, res){
    console.log("activated PUT /answers/:id")
    answers.update(req, res); });
  app.delete('/answers/:id', function(req, res) {
    answers.delete(req, res); });
}
