const { DataTypes } = require('sequelize');
const db = require('../utils/database');
const Routine = require("./routine");
const Exercise = require("./exercise");

const RoutineExercise = db.define('routineExercise', {
    routineExerciseId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sets: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    reps: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
}, {
    freezeTableName: true
});

/*RoutineExercise.associate = model => {
    RoutineExercise.belongsTo(model.routine, { foreignKey: 'routineId' });
    RoutineExercise.belongsTo(model.exercise, { foreignKey: 'exerciseId' });
}*/

module.exports = RoutineExercise;