const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//     console.log('this always runs')
//     next();
// });

app.use('/admin', adminData.routes);

app.use(shopRoutes);


app.use((req, res, next) => {
    res.status(404).render('not-found', { pageTitle: 'Page Not Found' });
})




// const server = http.createServer(app);

app.listen(8000);