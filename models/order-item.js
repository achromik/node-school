const { Model, DataTypes } = require('sequelize');

const sequelize = require('../util/datebase');

class OrderItem extends Model {
    get id() {
        return this.getDataValue('id');
    }

    get quantity() {
        return this.getDataValue('quantity');
    }

    set quantity(val) {
        this.setDataValue('quantity', val);
    }
}

OrderItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        quantity: DataTypes.INTEGER
    },
    { sequelize, modelName: 'orderItem' }
);

module.exports = OrderItem;
