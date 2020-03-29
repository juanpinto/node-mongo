const MongoClient = require('mongodb').MongoClient;
const asssert = require('assert');
const dbOperation = require('./operations')

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, { "useUnifiedTopology": "true" }, (error, client) => {

    asssert.equal(error, null);

    console.log('Connected to the database');

    const database = client.db(dbname);
    const collection = database.collection('dishes');

    dbOperation.insertDocument(database, { name: "Vadonut", description: "testing" }, 'dishes', (result) => {
        console.log('Insert Document:\n', result.ops);

        dbOperation.findDocuments(database, 'dishes', (result) => {
            console.log('Found Documents: \n', result);

            dbOperation.updateDocument(database, { name: "Vadonut" }, { description: "What a vadonut" }, 'dishes', (result) => {
                console.log('Document Updated:\n', result.result);

                dbOperation.findDocuments(database, 'dishes', (result) => {
                    console.log('Found Documents: \n', result);

                    database.dropCollection('dishes', (result) => {
                        console.log('Collection dropped: \n', result);
                        client.close();
                    })
                });
            });
        });
    });
})