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
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});




module.exports = Routine;