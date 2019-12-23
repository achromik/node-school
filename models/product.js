const { Model, DataTypes } = require('sequelize');

const sequelize = require('../util/datebase');

class Product extends Model {
    get id() {
        return this.getDataValue('id');
    }

    get title() {
        return this.getDataValue('title');
    }

    set title(val) {
        this.setDataValue('title', val);
    }

    get description() {
        return this.getDataValue('description');
    }

    set description(val) {
        this.setDataValue('description', val);
    }

    get imageUrl() {
        return this.getDataValue('imageUrl');
    }

    set imageUrl(val) {
        this.setDataValue('imageUrl', val);
    }

    get price() {
        return this.getDataValue('price');
    }

    set price(val) {
        this.setDataValue('price', val);
    }
}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: DataTypes.STRING,
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    { sequelize, modelName: 'product' }
);

module.exports = Product;
