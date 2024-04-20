const { DataTypes } = require('sequelize');
const db = require('./index');
const Plan = require('./plan');
const Routine = require('./routine');
const Exercise = require('./exercise')

const RoutineExercise = db.sequelize.define('routineExercise', {
    routineExerciseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    routineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: Routine,
            key: 'routineId'
        }
    },
    exerciseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: Exercise,
            key: 'exerciseId'
        }
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
});

Routine.hasMany(RoutineExercise, { foreignKey: 'routineId' });
Exercise.hasMany(RoutineExercise, { foreignKey: 'exerciseId' });

module.exports = RoutineExercise;