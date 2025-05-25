const express = require('express');
const router = express.Router();
const loginController = require('./controllers/login');
const registercontroller = require('./controllers/register');
// const authFetchController = require('./authFetch');
const refreshController = require('./controllers/refresh');

router.post('/login', loginController);
router.post('/register', registercontroller);
router.post('/refresh', refreshController);

// router.post('/authFetch', authFetchController);

module.exports = router;