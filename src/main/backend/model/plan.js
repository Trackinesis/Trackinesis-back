const { DataTypes } = require('sequelize');
const db = require('../utils/database');
const Signup = require("./signup");
const PlanRoutine = require("./planRoutine");
const Routine = require("./routine");

const Plan = db.define('plan', {
    planId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    objective: {
        type: DataTypes.STRING,
        allowNull: true
    },
    startDate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endDate: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});



module.exports = Plan;