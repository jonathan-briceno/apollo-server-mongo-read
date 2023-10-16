const Pregunta = require('../models/Pregunta');

module.exports = {

    Query: {
        async pregunta(_, {ID}) {
            return await Pregunta.findById(ID)
        }, 
        async getPreguntas(_, {tema}) {
            return await Pregunta.find({ tema: tema }) 
        }
    }
}