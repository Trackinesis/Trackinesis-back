const { DataTypes } = require('sequelize');
const db = require('./index');

const Signup = db.sequelize.define('signup', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = Signup;