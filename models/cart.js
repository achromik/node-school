const { Model, DataTypes } = require('sequelize');

const sequelize = require('../util/datebase');

class Cart extends Model {
    get id() {
        return this.getDataValue('id');
    }
}

Cart.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        }
    },
    { sequelize, modelName: 'cart' }
);

module.exports = Cart;
