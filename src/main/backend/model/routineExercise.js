const { DataTypes } = require('sequelize');
const db = require('../util/database');
const Routine = require("./routine");
const Exercise = require("./exercise");

const RoutineExercise = db.define('routineExercise', {
    routineExerciseId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    sets: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reps: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    timeExercise: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true
});

RoutineExercise.associate = model => {
    RoutineExercise.belongsTo(model.routine, { foreignKey: 'routineId' });
    RoutineExercise.belongsTo(model.exercise, { foreignKey: 'exerciseId' });
}

module.exports = RoutineExercise;