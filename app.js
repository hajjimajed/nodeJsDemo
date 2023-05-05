const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

const app = express();


const sequelize = require('./utils/database');


app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const notFoundController = require('./controllers/error');


// db.execute('SELECT * FROM products')
//     .then(result => {
//         console.log(result[0]);
//     })
//     .catch(err => {
//         console.log(err);
//     });


app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//     console.log('this always runs')
//     next();
// });

app.use('/admin', adminRoutes);

app.use(shopRoutes);


app.use(notFoundController.notFound)




sequelize.sync()
    .then(result => {
        // console.log(result);
        app.listen(8000);
    })
    .catch(err => console.log(err))



// const server = http.createServer(app);

