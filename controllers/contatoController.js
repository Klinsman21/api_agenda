const db = require('../config/db');
const Contato = require('../models/contato');

// Listar todos os contatos
exports.contatosList = async(req, res) => {
  console.log(req.params.id);
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const contatos = await Contato.findAll({
      where: {
        idUsuario: req.params.id
      }
    });
    res.json({ contatos: contatos });
  } catch(err) {
    res.send({ message: err.message });
  }
};

// Detalhar um contato
exports.contatosRead = async(req, res) => {
  try {
    const contato = await Contato.findOne({
      where: {
        id: req.params.id
      }
    });
    res.json({ contato: contato });
  } catch(err) {
    res.send({ message: err.message });
  }
};

// Criar um contato
exports.contatosCreate = async(req, res) => {
  try {
    const contato = await Contato.create(req.body);
    res.status(201).json({ message: true });
  } catch(err) {
    res.send({ message: false });
  }
};

// Atualizar um contato
exports.contatosUpdate = async(req, res) => {
  try {
    const contato = await Contato.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(204).send();
  } catch(err) {
    res.send({ message: err.message });
  }
};

// Apagar um contato
exports.contatosDelete = async(req, res) => {
  try {
    const contato = await Contato.destroy({
      where: {
          id: req.params.id
      }
    });
    res.status(204).send();
  } catch(err) {
    res.send({ message: err.message });
  }
};

