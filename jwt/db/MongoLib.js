const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = process.env.MONGO_URI;

const dbName = 'isis3710usersdb';

const client = new MongoClient(url, { useUnifiedTopology: true });

const getDatabase = (callback) => {
    client.connect(function (err) {
        assert.equals(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        callback(db, client);
    });
}

const findUsers = function (db, callback) {
    const collection = db.collection('isis3710userscollection');
    collection.find({}).toArray(function (err, users) {
        assert.equals(err, null);
        callback(users);
    });
}

exports.getDatabase = getDatabase;
exports.findUsers = findUsers;