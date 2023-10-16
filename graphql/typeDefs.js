const { gql } = require('apollo-server')

module.exports = gql`
type Pregunta {
    nombre_pregunta: String
    tema: String
    opciones: [Opciones]
}

type Opciones {
    nombre_opcion: String
    correcta: Boolean 
}

type Query {

    pregunta(ID: ID!): Pregunta!
    getPreguntas(tema: String): [Pregunta]
}
`