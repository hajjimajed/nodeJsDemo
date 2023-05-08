const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const mongoose = require('mongoose');



const User = require('./models/user');


app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const notFoundController = require('./controllers/error');




app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('6458fb6c109304700165c9f1')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err))
})



app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(notFoundController.notFound)



mongoose
    .connect('mongodb+srv://hajjimajed78:rHh6z3McFzWLIPbK@cluster0.xh4x4zf.mongodb.net/shop?retryWrites=true&w=majority')
    .then(result => {
        User.findOne()
            .then(user => {
                if (!user) {
                    const user = new User({
                        name: 'majed',
                        email: 'majed@gmail.com',
                        cart: {
                            items: []
                        }
                    })
                    user.save()
                }
            })
        app.listen(8000);
    })
    .catch(err => console.log(err))




