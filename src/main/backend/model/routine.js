const { DataTypes } = require('sequelize');
const db = require('../util/database');
const PlanRoutine = require("./planRoutine");

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

//Routine.hasMany(PlanRoutine, { foreignKey: 'routineId' });

module.exports = Routine;