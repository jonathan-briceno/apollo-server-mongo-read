const { model, Schema} = require('mongoose');

const preguntaSchema = new Schema({
    enunciado: String
});

module.exports = model('Pregunta', preguntaSchema);
