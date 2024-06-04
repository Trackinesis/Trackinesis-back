const { DataTypes} = require('sequelize');
const db = require('../utils/database');

const Friend = db.define('friend', {
    friendId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    freezeTableName: true
});

module.exports = Friend;