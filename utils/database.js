const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://hajjimajed78:rHh6z3McFzWLIPbK@cluster0.xh4x4zf.mongodb.net/shop?retryWrites=true&w=majority')
        .then(client => {
            console.log('connected !');
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'no db found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;














// using sql database : mysql2 and sequelize
// const Sequelize = require('sequelize');


// const sequelize = new Sequelize('node-complete', 'root', '12345678', {
//     dialect: 'mysql',
//     host: 'localhost'
// });


// module.exports = sequelize;