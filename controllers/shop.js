const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (_req, res, _next) => {
    Product.fetchAll()
        .then(([rows]) =>
            res.render('shop/product-list', {
                prods: rows,
                pageTitle: 'All Products',
                path: '/products'
            })
        )
        .catch(err => console.log(err));
};

exports.getProductById = (req, res, _next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(([product]) => {
            res.render('shop/product-detail', {
                product: product[0],
                pageTitle: product.title,
                path: `/products/${product.id}`
            });
        })
        .catch(err => console.log(err));
};

exports.getIndex = (_req, res, _next) => {
    Product.fetchAll()
        .then(([rows]) => {
            res.render('shop/index', {
                prods: rows,
                pageTitle: 'Shop',
                path: '/'
            });
        })
        .catch(err => console.log(err));
};

exports.getCart = (_req, res, _next) => {
    Cart.getCart(_cart => {
        Product.fetchAll();
        res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: cartProducts
        });
    });
};

exports.postCart = (req, res, _next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.addProduct(product.id, product.price);
    });
    res.redirect('/cart');
};

exports.postCartDeleteItem = (req, res, _next) => {
    const { id } = req.body;
    Product.findById(id, product => {
        Cart.deleteProduct(id, product.price);
        res.redirect('/cart');
    });
};

exports.getOrders = (_req, res, _next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
};

exports.getCheckout = (_req, res, _next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};
