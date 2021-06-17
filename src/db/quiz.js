const mongoose = require('mongoose');

const quiz = new mongoose.Schema({

  id: String,
  pregunta: String,
  respuestas: {
    a: String,
    b: String,
    c: String,
    d: String,
    correct: [String]
  },
  img: String
  
});

const Quiz = mongoose.model("Quizs", quiz);

module.exports = Quiz;