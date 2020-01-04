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

    const product = new Product(title, price, description, imageUrl);
    product
        .save()
        .then(() => res.redirect('/admin/products'))
        .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, _next) => {
    const editMode = req.query.edit;

    if (!editMode) {
        return res.redirect('/');
    }

    const prodId = req.params.productId;

    Product.findById(prodId)

        .then(product => {
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

    const product = new Product(title, price, description, imageUrl, id);

    product
        .save()
        .then(() => res.redirect('/admin/products'))
        .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const { id } = req.body;

    Product.deleteById(id)
        .then(() => res.redirect('/admin/products'))
        .catch(err => console.log(err));
};

exports.getProducts = (req, res, _next) => {
    Product.fetchAll()
        .then(products =>
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            })
        )
        .catch(err => console.log(err));
};
