const { DataTypes} = require('sequelize');
const db = require('../utils/database');

const Friend = db.define('friend', {
    userFriendId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    followedId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    followedName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    freezeTableName: true
});

module.exports = Friend;