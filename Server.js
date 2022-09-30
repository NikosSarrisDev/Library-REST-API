//Ο φακελος index.js ειναι αυτος που τρεχουμε για να εκτελεστει το API 
//Στο Αρχειο package.json() στα dependences και στο devDependences 
//βρισκεται το nodemon καθως και στο πεδιο script βρισκεται η εντολη 
//για να τρεξουμε το index.js. Πληκτρολογουμε στο CLI : npm run myServer2

require('dotenv').config();

const express = require('express');

const root = express();

// const bodyParser = require('body-Parser');

const mongooose = require('mongoose');

const PORT = 5000;

mongooose.connect(process.env.DATABASE_URL,{useNewUrlParser : true},() => console.log("Connect to db"));

const db = mongooose.connection
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connect to Database'));

root.use(express.json());///Middleware

//Κανουμε require το αρχειο api.js που περιεχει τον server μας με τα endpoints
const api_init = require('./PATH/api_init');

root.use('/api_init',api_init);///Middleware

root.listen(PORT, () => {
    console.log(`This API is listening on port ${PORT}`);
});



