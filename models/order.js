const { Model, DataTypes } = require('sequelize');

const sequelize = require('../util/datebase');

class Order extends Model {
    get id() {
        return this.getDataValue('id');
    }
}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        }
    },
    { sequelize, modelName: 'order' }
);

module.exports = Order;
