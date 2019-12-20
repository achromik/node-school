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

    const product = new Product(null, title, imageUrl, description, price);

    product
        .save()
        .then(() => res.redirect('/'))
        .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, _next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }

    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if (!product) {
            return res.redirect('/');
        }

        res.render('admin/edit-product', {
            pageTitle: 'Add Product',
            path: '/admin/edit-product',
            editing: editMode,
            product
        });
    });
};

exports.postEditProduct = (req, res, _next) => {
    const { id, title, imageUrl, price, description } = req.body;

    const updatedProduct = new Product(id, title, imageUrl, description, price);

    updatedProduct.save();
    res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
    const { id } = req.body;

    Product.deleteById(id);
    res.redirect('/admin/products');
};

exports.getProducts = (_req, res, _next) => {
    Product.fetchAll(products =>
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        })
    );
};
