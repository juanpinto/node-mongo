const MongoClient = require('mongodb').MongoClient;
const asssert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, { "useUnifiedTopology": "true" }, (error, client) => {

    asssert.equal(error, null);

    console.log('Connected to the database');

    const database = client.db(dbname);
    const collection = database.collection('dishes');

    collection.insertOne({"name":"Uthappizza", "description": "testing"}, (error, result) =>{
        asssert.equal(error, null);

        console.log('After insert \n');
        console.log(result.ops);

        //FIND ALL
        collection.find({}).toArray((error, documents) => {
            asssert.equal(error, null)

            console.log('Found \n')
            console.log(documents)

            database.dropCollection('dishes', (error, result) => {
                asssert.equal(error, null)
                client.close
            })
        })
    })
    
})