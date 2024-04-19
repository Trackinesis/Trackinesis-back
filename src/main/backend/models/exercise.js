const { DataTypes } = require('sequelize');
const db = require('./index');

const Exercise = db.sequelize.define('Exercise', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Exercise;