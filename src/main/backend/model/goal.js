const { DataTypes} = require('sequelize');
const db = require('../utils/database');

const Goal = db.define('goal', {
    goalId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},{freezeTableName: true});

module.exports = Goal;