const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// using sql database : mysql2
// const sequelize = require('./utils/database');
// const Product = require('./models/product');
// const User = require('./models/user');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');
// const Order = require('./models/order');
// const OrderItem = require('./models/order-item');


const mongoConnect = require('./utils/database').mongoConnect;
const User = require('./models/user');


app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const notFoundController = require('./controllers/error');




app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('6458c00c69b35fa2301c18e8')
        .then(user => {
            req.user = new User(
                user.name,
                user.email,
                user.cart,
                user._id
            );
            next();
        })
        .catch(err => console.log(err))
})



app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(notFoundController.notFound)



mongoConnect(() => {
    app.listen(8000);
})






// using sql database : mysql2
// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem })

// sequelize
//     // .sync({ force: true })
//     .sync()
//     .then(result => {
//         return User.findByPk(1)
//         // console.log(result);
//         app.listen(8000);
//     })
//     .then(user => {
//         if (!user) {
//             return User.create({ name: 'majed', email: 'majed@gmail.com' });
//         }
//         return user;
//     })
//     .then(user => {
//         // console.log(user);
//         user.createCart();
//     })
//     .then(cart => {
//         app.listen(8000);
//     })
//     .catch(err => console.log(err))


