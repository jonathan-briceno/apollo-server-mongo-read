const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pregunta = new Schema({
    enunciado: String, 
    tipo: String
});

const model = mongoose.model('preguntas', pregunta);

module.exports = model;