const Sequelize = require('sequelize');
const database = require('../config/db');

const User = database.define('user', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        allowEmpty: false,
        len: [6, 255]
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        allowEmpty: false,
        len: [6, 255]
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        allowEmpty: false,
        len: [6, 1024]
    },
    verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        allowEmpty: true,
        defaultValue: false,
    },
    admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        allowEmpty: true,
        defaultValue: false,
    },
    acessToken: {
        type: Sequelize.STRING,
        allowNull: false,
        allowEmpty: false,
    },
})

module.exports = User;