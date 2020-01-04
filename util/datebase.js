const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    MongoClient.connect(
        'mongodb+srv://node-complete:node-complete@mongo-nwxyl.mongodb.net/shop?retryWrites=true&w=majority',
        { useUnifiedTopology: true }
    )
        .then(client => {
            console.log('Connected!');
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }

    throw 'No database found!';
};

module.exports = { mongoConnect, getDb };
