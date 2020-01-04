const ObjectID = require('mongodb').ObjectID;

const { getDb } = require('../util/datebase');

class Product {
    constructor(title, price, description, imageUrl, id) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? new ObjectID(id) : null;
    }

    save() {
        const db = getDb();

        const dbOperator = !this._id
            ? db.collection('products').insertOne(this)
            : db.collection('products').findOneAndUpdate(
                  { _id: new ObjectID(this._id) },
                  {
                      $set: this
                  }
              );

        return dbOperator;
    }

    static fetchAll() {
        const db = getDb();
        return db
            .collection('products')
            .find()
            .toArray();
    }

    static findById(id) {
        const db = getDb();
        return db.collection('products').findOne({ _id: new ObjectID(id) });
    }

    static deleteById(id) {
        const db = getDb();

        return db.collection('products').deleteOne({ _id: new ObjectID(id) });
    }
}

module.exports = Product;
