const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (_req, res, _next) => {
    Product.findAll()
        .then(products =>
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products'
            })
        )
        .catch(err => console.log(err));
};

exports.getProductById = (req, res, _next) => {
    const prodId = req.params.productId;

    Product.findByPk(prodId)
        .then(product => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: `/products/${product.id}`
            });
        })
        .catch(err => console.log(err));
};

exports.getIndex = (_req, res, _next) => {
    Product.findAll()
        .then(products =>
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/'
            })
        )
        .catch(err => console.log(err));
};

exports.getCart = (_req, res, _next) => {
    Cart.getCart(_cart => {
        Product.findAll();
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
