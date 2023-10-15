const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const consume = require("./kafka/consumer")


const MONGODB = "mongodb://localhost:27017/admin"

//https://www.mongodb.com/basics/mongodb-connection-string 

// como funciona Apollo Server 
// typeDefs: los modelos 
// resolvers: como se llenan los modelos 

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({ 
  typeDefs, 
  resolvers
})

mongoose.connect(MONGODB, {useNewUrlParser: true})
  .then(() => {
    console.log("MongoDB Connection Success");
    return server.listen({port: 5000})
  }).then((res) => {
    console.log(`Server Running at ${res.url}`)
  });

 // start the consumer, and log any errors
consume().catch((err) => {
	console.error("error in consumer: ", err)
})