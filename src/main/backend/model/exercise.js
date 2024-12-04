const { DataTypes } = require('sequelize');
const db = require('../utils/database');

const Exercise = db.define('exercise', {
    exerciseId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image: {
        type: DataTypes.BLOB('long'),  // Imagen almacenada como BLOB en la misma tabla
        allowNull: true,
    },
}, {
    freezeTableName: true,
});

module.exports = Exercise;
