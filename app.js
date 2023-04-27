const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');

const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//     console.log('this always runs')
//     next();
// });

app.use('/admin', adminRoutes);

app.use(shopRoutes);


app.use((req, res, next) => {
    res.status(404).send('<h1>page not found</h1>')
})




// const server = http.createServer(app);

app.listen(8000);