const Product = require('../models/product');

exports.getAddProduct = (_req, res, _next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (req, res, _next) => {
    const { title, imageUrl, price, description } = req.body;
    req.user
        .createProduct({
            title,
            price,
            imageUrl,
            description
        })
        .then(() => res.redirect('/admin/products'))
        .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, _next) => {
    const editMode = req.query.edit;

    if (!editMode) {
        return res.redirect('/');
    }

    const prodId = req.params.productId;

    req.user
        .getProducts({ where: { id: prodId } })
        .then(products => {
            const product = products[0];
            if (!product) {
                return res.redirect('/');
            }

            res.render('admin/edit-product', {
                pageTitle: 'Add Product',
                path: '/admin/edit-product',
                editing: editMode,
                product
            });
        })
        .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, _next) => {
    const { id, title, imageUrl, price, description } = req.body;

    Product.findByPk(id)
        .then(product => {
            product.title = title;
            product.imageUrl = imageUrl;
            product.description = description;
            product.price = price;
            return product.save();
        })
        .then(() => res.redirect('/admin/products'))
        .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const { id } = req.body;

    Product.findByPk(id)
        .then(product => product.destroy())
        .then(() => res.redirect('/admin/products'))
        .catch(err => console.log(err));
};

exports.getProducts = (req, res, _next) => {
    req.user
        .getProducts()
        // Product.findAll()
        .then(products =>
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            })
        )
        .catch(err => console.log(err));
};
