const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const notFoundController = require('./controllers/error');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//     console.log('this always runs')
//     next();
// });

app.use('/admin', adminRoutes);

app.use(shopRoutes);


app.use(notFoundController.notFound)




// const server = http.createServer(app);

app.listen(8000);