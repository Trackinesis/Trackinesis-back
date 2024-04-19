const Sequelize = require('sequelize');
const db = require('./index');

const Routine = db.sequelize.define('routine', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    code: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    objective: {
        type: Sequelize.STRING,
        allowNull: true
    }
    
});

module.exports = Routine;