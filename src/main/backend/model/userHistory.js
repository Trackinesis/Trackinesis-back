const { DataTypes} = require('sequelize');
const db = require('../utils/database');

const UserHistory = db.define('userHistory', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    maxBench: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    maxSquat: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    maxDeadLift: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    strengthRatio: {
        type: DataTypes.FLOAT,
        allowNull: true,
    }
}, {
    freezeTableName: true
});

module.exports = UserHistory;