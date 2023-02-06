const db = require('../config/db');
const emailSend = require('../utils/sendEmails')
const User = require('../models/user');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Cadastrar usuário 
exports.userCreate = async (req, res) => {
  let user = null;
  console.log(req.body.email)
  try {
    user = await User.findOne({ 
      where: { 
        email: req.body.email
      }
    });
  } catch (err) {
    res.json({ message: err.message });
  } 

  if (user != null) {
    return res.status(400).json({ message: 'E-mail já cadastrado.' });
  } 
 
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  const newUser = Object.assign({}, req.body);
  newUser.password = hashedPassword;
  let Uniquetoken = jwt.sign({ email: req.body.email }, salt, { expiresIn: '1h' });
  newUser.acessToken = Uniquetoken;

  try { 
    user = await User.create(newUser);
    emailSend.SendEmail(req.body.email, Uniquetoken);
    res.json({ message: true });
  } catch (err) {
    res.json({ message: err.message });
  }
};

// Fazer login
exports.userLogin = async (req, res) => {
  let user = null;
  try {
    user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
  } catch (err) {
    res.json({ message: err.message });
  }

  let message = 'E-mail ou senha inválidos.';
  if (user == null) {
    return res.status(400).json({ message: message });
  }
  console.log(user.password)
  
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  console.log(validPassword)
  if (!validPassword) {
    return res.status(400).json({ message: message });
  }

  if (true) {//user.verified
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
    res.header('Auth-Token', token).json({ token: token, id: user.id, admin: user.admin });
  }
  else {
    message = "Conta não verificada"
    res.status(404).json({ message: message })
  }
};

// Atualizar usuario
exports.userUpdate = async (req, res) => {
  let user = null;
  try {
    user = await User.findOne({
      where: {
        id: req.params.id
      }
    });
  } catch (err) {
    res.json({ message: err.message });
  }

  let message = 'Usuário não encontrado.';
  if (user == null) {
    return res.status(400).json({ message: message });
  }

  if (user.verified) {
    try {
      user = await User.update(req.body, {
        where: {
          id: req.params.id
        }
      });
      res.status(204).send();
    } catch (err) {
      res.send({ message: err.message });
    }
  }
  else {
    message = "Conta não verificada"
    res.status(404).json({ message: message })
  }
};

exports.userValidate = async (req, res) => {
  console.log("teste")
  try {
    const updatedRows = await User.update(
      {
        verified: true,
      },
      {
        where: { acessToken: req.params.token },
      }
    );
    if (updatedRows[0] == 0) {
      res.status(404).json({ message: "Erro ao verificar a conta" })
    }
    else {
      res.status(401).json({ message: "Conta verificada com sucesso" })
    }
  } catch (err) {
    res.json({ message: err.message });
  }
};
