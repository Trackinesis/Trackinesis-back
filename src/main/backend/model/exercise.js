const { DataTypes} = require('sequelize');
const db = require('../utils/database');
const RoutineExercise = require("./routineExercise");

const Exercise = db.define('exercise', {
    exerciseId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
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
}, {
    freezeTableName: true
});

/*Exercise.associate = model => {
    Exercise.hasMany(model.routineExercise, { foreignKey: 'exerciseId' });
}*/

module.exports = Exercise;