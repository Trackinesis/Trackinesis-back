const { DataTypes } = require('sequelize');
const db = require('./index');
const Signup = require('./signup')

const User = db.sequelize.define('user', {
    userInfoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: Signup,
            key: 'userId'
        }
    }
});

Signup.hasOne(User, { foreignKey: 'userId' });

module.exports = User;