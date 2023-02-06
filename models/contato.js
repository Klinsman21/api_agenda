const Sequelize = require('sequelize');
const database = require('../config/db');
const User = require('./user')

const Contato = database.define('contato', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
    allowEmpty: false
  },
  telefone: {
    type: Sequelize.STRING,
    allowNull: false,
    allowEmpty: false
  },
})

Contato.belongsTo(User, {
  constraint: true, 
  foreignKey: 'idUsuario'
});

module.exports = Contato;