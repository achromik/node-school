const path = require('path');

const express = require('express');

const errorController = require('./controllers/error.js');
const sequelize = require('./util/datebase');

const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });

User.hasMany(Product);

sequelize
    // .sync({ force: true })
    .sync()
    .then(() => {
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'Alex', email: 'alex@domain.com' });
        }
        return user;
    })
    .then(user => {
        console.log(user);
        app.listen(3000);
    })
    .catch(err => console.log(err));
