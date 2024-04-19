const DataTypes = require('sequelize');
const db = require('./index');

const Routine = db.sequelize.define('routine', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    objective: {
        type: DataTypes.STRING,
        allowNull: true
    }
    
});

module.exports = Routine;