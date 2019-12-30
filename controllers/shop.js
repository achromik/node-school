const Product = require('../models/product');

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

exports.getCart = (req, res, _next) => {
    req.user
        .getCart()
        .then(cart => {
            console.log(cart);
            return cart.getProducts();
        })
        .then(products => {
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
            });
        })
        .catch(err => console.log(err));
};

exports.postCart = (req, res, _next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: prodId } });
        })
        .then(products => {
            const product = products.length ? products[0] : undefined;
            if (product) {
                newQuantity = product.cartItem.quantity + 1;
            }
            return product || Product.findByPk(prodId);
        })
        .then(product => {
            return fetchedCart.addProduct(product, {
                through: { quantity: newQuantity }
            });
        })
        .then(() => res.redirect('/cart'))
        .catch(err => console.log(err));
};

exports.postCartDeleteItem = (req, res, _next) => {
    const { id } = req.body;
    let fetchedCart;

    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: id } });
        })
        .then(products => {
            // const product = products[0];
            return fetchedCart.removeProduct(id);
        })
        .then(() => res.redirect('/cart'))
        .catch(console.log);
};
exports.postCreateOrder = (req, res, next) => {
    let orderProducts;
    let userCart;
    req.user
        .getCart()
        .then(cart => {
            userCart = cart;
            return cart.getProducts();
        })
        .then(products => {
            orderProducts = products;
            return req.user.createOrder();
        })
        .then(order => {
            order.addProducts(
                orderProducts.map(product => {
                    product.orderItem = {
                        quantity: product.cartItem.quantity
                    };
                    return product;
                })
            );
        })
        .then(() => userCart.setProducts(null))
        .then(() => {
            res.redirect('/orders');
        })

        .catch(console.log);
};

exports.getOrders = (req, res, _next) => {
    req.user
        .getOrders({ include: ['products'] })
        .then(orders => {
            console.log(orders);
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders
            });
        })
        .catch(console.log);
};
