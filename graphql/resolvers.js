const Pregunta = require('../models/Pregunta');

module.exports = {

    Query: {
        async pregunta(_, {ID}) {
            return await Pregunta.findById(ID)
        }, 
        async getPreguntas(_, {amount}) {
            return await Pregunta.find().sort( {createdAt: -1} ).limit(amount)
        }
    }




}