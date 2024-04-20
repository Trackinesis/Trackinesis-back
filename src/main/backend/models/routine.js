const { DataTypes } = require('sequelize');
const db = require('./index');
const Exercise = require("./exercise");
const PlanRoutine = require("./planRoutine");

const Routine = db.sequelize.define('routine', {
    routineId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        references: {
            model: PlanRoutine,
            key: 'routineId'
        }
    },
    name: {
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
});

module.exports = Routine;