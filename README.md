# apollo-server-mongo-read
## Overview

Este proyecto tiene como finalidad consumir desde el tópico `my-topic` de Kafka una nueva pregunta, y escribirla en la colección `preguntas` de MongoDB.

## Pasos Para Ejecutar 

1. correr npm start
2. ingresar a http://localhost:5000/ para correr queries sobre el schema Pregunta
3. se debe crear una colección `preguntas` sobre la bd mongo `admin`, que manejará el siguiente schema
4. La UI de Kafka (Kafdrop) puede consultarse en http://localhost:9000/

## Información Adicional 

```javascript

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

```

docker compose para mongodb y mysql 

```yml
version: "3.8"
services:
  mongodb:
    image: mongo:6-jammy
    ports:
      - '27017:27017'
    volumes:
      - dbdata6:/data/db

  db:
    image: mysql:8.0
    ports:
      - '5200:3306'
    environment:
      - MYSQL_DATABASE=preguntas
      - MYSQL_ROOT_PASSWORD=123
    volumes:
      - db:/var/lib/mysql

volumes:
  dbdata6:
  db:
```

docker compose de kafka 

```yml
version: "2"
services:
  kafdrop:
    image: obsidiandynamics/kafdrop:3.28.0
    restart: "no"
    ports:
      - "9000:9000"
    environment:
      KAFKA_BROKERCONNECT: "kafka:29092"
      JVM_OPTS: "-Xms16M -Xmx48M -Xss180K -XX:-TieredCompilation -XX:+UseStringDeduplication -noverify"
    depends_on:
      - "kafka"
  kafka:
    image: obsidiandynamics/kafka
    restart: "no"
    ports:
      - '9093:9093'
    expose:
      - "9093"
    environment:
      KAFKA_LISTENERS: "INTERNAL://:29092,EXTERNAL://:9093"
      KAFKA_ADVERTISED_LISTENERS: "INTERNAL://kafka:29092,EXTERNAL://localhost:9093"
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: "INTERNAL:PLAINTEXT,EXTERNAL:PLAINTEXT"
      KAFKA_INTER_BROKER_LISTENER_NAME: "INTERNAL"
      KAFKA_ZOOKEEPER_SESSION_TIMEOUT: "6000"
      KAFKA_RESTART_ATTEMPTS: "10"
      KAFKA_RESTART_DELAY: "5"
      ZOOKEEPER_AUTOPURGE_PURGE_INTERVAL: "0"
```
petición de ejemplo para el PRODUCER de ejemplo 

```curl
curl --location 'localhost:8080/api/send' \
--header 'Content-Type: application/json' \
--data '{
    "message" : "{\"nombre_pregunta\":\"Esta pregunta se guarda desde el kafka 8\",\"tema\":\"Java\",\"opciones\":[{\"nombre_opcion\":\"Esta es la respuetsa correcta se guardó desde kafka 4\",\"correcta\":true},{\"nombre_opcion\":\"Estaesla respuetsa incorrecta se guardó desde kafka 4\",\"correcta\":false}]}"
}'
```

petición en JSON 

```json
{
    "message" : "{\"nombre_pregunta\":\"Esta pregunta se guarda desde el kafka 8\",\"tema\":\"Java\",\"opciones\":[{\"nombre_opcion\":\"Esta es la respuetsa correcta se guardó desde kafka 4\",\"correcta\":true},{\"nombre_opcion\":\"Estaesla respuetsa incorrecta se guardó desde kafka 4\",\"correcta\":false}]}"
}
```

versión de mongoose 

```javascript 
npm install mongoose@6.10.0 
```
