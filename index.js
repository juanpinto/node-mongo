const MongoClient = require('mongodb').MongoClient;
const asssert = require('assert');
const dbOperation = require('./operations')

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, { "useUnifiedTopology": "true" }).then((client) => {
    
    console.log('Connected to the database');
    const database = client.db(dbname);

    dbOperation.insertDocument(database, { name: "Vadonut", description: "testing" }, 'dishes')
        .then((result) => {
            console.log('Insert Document:\n', result.ops);
            return dbOperation.findDocuments(database, 'dishes');
        })
        .then((documents) => {
            console.log('Found Documents: \n', documents);
            return dbOperation.updateDocument(database, { name: "Vadonut" }, { description: "What a vadonut" }, 'dishes');
        })
        .then((result) => {
            console.log('Document Updated:\n', result.result);
            return dbOperation.findDocuments(database, 'dishes');
        })
        .then((result) => {
            console.log('Found Documents: \n', result);
            return database.dropCollection('dishes');
        })
        .then((result) => {
            console.log('Collection dropped: \n', result);
            client.close();
        }).catch((error) => { console.log('Error: ', error) });

})
    .catch((error) => { console.log('Error conecting to Mongo') })