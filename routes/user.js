const express = require('express');
const router = express.Router();

// Importa o controller
const userController = require('../controllers/userController');

router.post('/register', userController.userCreate);
router.post('/login', userController.userLogin);
router.patch('/update/:id', userController.userUpdate);
router.get('/validate/:token', userController.userValidate);
// router.get('/validate', userController.userValidate);

module.exports = router;
