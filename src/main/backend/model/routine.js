const { DataTypes } = require('sequelize');
const db = require('../utils/database');
const PlanRoutine = require("./planRoutine");
const Plan = require("./plan");

const Routine = db.define('routine', {
    routineId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    day: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    freezeTableName: true
});




module.exports = Routine;