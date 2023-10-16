const { gql } = require('apollo-server')

module.exports = gql`
type Pregunta {
    enunciado: String
}

type Query {

    pregunta(ID: ID!): Pregunta!
    getPreguntas(tipo: String): [Pregunta]
}
`