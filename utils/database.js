const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://hajjimajed78:rHh6z3McFzWLIPbK@cluster0.xh4x4zf.mongodb.net/?retryWrites=true&w=majority')
        .then(client => {
            console.log('connected !');
            callback(client);
        })
        .catch(err => console.log(err))
}

module.exports = mongoConnect;














// using sql database : mysql2 and sequelize
// const Sequelize = require('sequelize');


// const sequelize = new Sequelize('node-complete', 'root', '12345678', {
//     dialect: 'mysql',
//     host: 'localhost'
// });


// module.exports = sequelize;