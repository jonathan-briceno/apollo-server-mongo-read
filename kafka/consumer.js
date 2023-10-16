const { Kafka } = require("kafkajs")
const Pregunta = require('../models/Pregunta');
const mongoose = require('mongoose');

// the client ID lets kafka know who's producing the messages
const clientId = "nodejs-kafka"
// we can define the list of brokers in the cluster
const brokers = ["localhost:9093"]
// this is the topic to which we want to write messages
const topic = "my-topic"

// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ clientId, brokers })

const db = mongoose.connection;


const consumer = kafka.consumer({ groupId: "test-group" })

const consume = async () => {
	// first, we wait for the client to connect and subscribe to the given topic
	await consumer.connect()
	await consumer.subscribe({ topic })
	await consumer.run({
		// this function is called every time the consumer gets a new message
		eachMessage: ({ message }) => {
			// here, we just log the message to the standard output
			console.log(`received message: ${message.value}`)
			
			mensajeObjeto = JSON.parse(message.value)

			console.log(typeof(mensajeObjeto))

			const pregunta = new Pregunta({ nombre_pregunta: mensajeObjeto.nombre_pregunta, tema : mensajeObjeto.tema, opciones: mensajeObjeto.opciones  });

			pregunta.save(function (err) {
				if (err) return handleError(err);
				// saved!
			  });
			  console.log("pregunta salvada!")


		},
	})
}

module.exports = consume