const Pregunta = require('../models/Pregunta');

module.exports = {

    Query: {
        async pregunta(_, {ID}) {
            return await Pregunta.findById(ID)
        }, 
        async getPreguntas(_, {tipo}) {
            return await Pregunta.find({ tipo: tipo }) 
           
        }
    }
}