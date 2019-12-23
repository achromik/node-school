const { Model, DataTypes } = require('sequelize');

const sequelize = require('../util/datebase');

class User extends Model {
    get id() {
        return this.getDataValue('id');
    }

    get name() {
        return this.getDataValue('name');
    }

    set name(val) {
        this.setDataValue('name', val);
    }

    get email() {
        return this.getDataValue('email');
    }

    set email(val) {
        this.setDataValue('email', val);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    { sequelize, modelName: 'user' }
);

module.exports = User;
