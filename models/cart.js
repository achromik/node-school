const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');
const p = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };

            if (!err) {
                cart = JSON.parse(fileContent.toString());
            }

            const existingProductIndex = cart.products.findIndex(
                product => product.id === id
            );

            const existingProduct = cart.products[existingProductIndex];

            let updatedProduct;
            if (existingProduct) {
                updatedProduct = {
                    ...existingProduct,
                    qty: existingProduct.qty + 1
                };
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                err && console.log(err);
            });
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }

            const cart = JSON.parse(fileContent.toString());

            const productToDelete = cart.products.find(
                product => product.id === id
            );

            if (!productToDelete) {
                return;
            }

            const updatedProducts = cart.products.filter(
                product => product.id !== id
            );

            cart.products = updatedProducts;

            cart.totalPrice -= productToDelete.qty * productPrice;

            fs.writeFile(p, JSON.stringify(cart), err => {
                err && console.log(err);
            });
        });
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent.toString());
            cb(cart);
        });
    }
};
