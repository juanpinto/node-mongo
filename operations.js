const assert = require("assert");

exports.insertDocument = (database, document, collectionName, callback) => {
    const dbCollection = database.collection(collectionName);
    dbCollection.insert(document, (error, result) => {
        assert.equal(error, null);
        console.log(`Inserted ${result.result.n} documents into the collection`);
        callback(result);
    })
};

exports.findDocuments = (database, collectionName, callback) => {
    const dbCollection = database.collection(collectionName);
    dbCollection.find({}).toArray((error, result) => {
        assert.equal(error, null);
        callback(result);
    })

};

exports.removeDocument = (database, document, collectionName, callback) => {
    const dbCollection = database.collection(collectionName);
    dbCollection.deleteOne(document, (error, result) => {
        assert.equal(error, null);
        console.log("Document deleted", document);
        callback(result);
    })
};


exports.updateDocument = (database, document, update, collectionName, callback) => {
    const dbCollection = database.collection(collectionName);
    dbCollection.updateOne(document, { $set: update}, null, (error, result) => {
        assert.equal(error, null);
        console.log("Document updated", document);
        callback(result);
    })
};