const express = require('express');
const router = express.Router();
const verify = require('../utils/verifyToken');

// Importa o controller
const contatoController = require('../controllers/contatoController');

router.get('/listForUser/:id', verify, contatoController.contatosList);
router.get('/:id', contatoController.contatosRead);
router.post('/', verify, contatoController.contatosCreate);
router.patch('/:id', verify, contatoController.contatosUpdate);
router.delete('/:id', verify, contatoController.contatosDelete);

module.exports = router;
