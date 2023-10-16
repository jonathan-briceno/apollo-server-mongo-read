const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const opcionPregunta = new Schema({
    nombre_opcion: String, 
    correcta: Boolean, 

});

const pregunta = new Schema({
    nombre_pregunta: String, 
    tema: String, 
    opciones: {
        type: [opcionPregunta]
    }
});

const model = mongoose.model('preguntas', pregunta);

module.exports = model;