const express = require('express');
const router = express.Router();
const loginController = require('./controllers/login');
const registercontroller = require('./controllers/register');
// const authFetchController = require('./authFetch');
const refreshController = require('./controllers/refresh');
const eventRoutes = require('./controllers/events');

router.post('/login', loginController);
router.post('/register', registercontroller);
router.post('/refresh', refreshController);
router.use('/events', eventRoutes);


// router.post('/authFetch', authFetchController);

module.exports = router;