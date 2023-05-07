// sql
// const Sequelize = require('sequelize');
// const sequelize = require('../utils/database');

const getDb = require('../utils/database').getDb;

const mongodb = require('mongodb');

class Product {
    constructor(title, price, description, imageUrl, id) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            //update
            dbOp = db.collection('products')
                .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this })
        } else {
            // create
            dbOp = db.collection('products').insertOne(this)
        }
        return dbOp
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log(err))
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products').find().toArray()
            .then(products => {
                console.log(products)
                return products
            })
            .catch(err => console.log(err))
    }

    static findById(prodId) {
        const db = getDb();
        return db.collection('products').find({ _id: new mongodb.ObjectId(prodId) }).next()
            .then(product => {
                console.log(product)
                return product
            })
            .catch(err => console.log(err))
    }
}

//sql
// const Product = sequelize.define('product', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     title: Sequelize.STRING,
//     price: {
//         type: Sequelize.DOUBLE,
//         allowNull: false
//     },
//     imageUrl: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     description: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// })


module.exports = Product;