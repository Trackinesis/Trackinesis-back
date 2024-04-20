const { DataTypes } = require('sequelize');
const db = require('./index');
const RoutineExercise = require("./routineExercise");

const Exercise = db.sequelize.define('exercise', {
    exerciseId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        references: {
            model: RoutineExercise, //pointer to another table
            key: 'exerciseId'
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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

module.exports = Exercise;