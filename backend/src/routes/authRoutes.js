const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');
const registercontroller = require('../controllers/register');

router.post('/login', loginController);
router.post('/register', registercontroller);

module.exports = router;