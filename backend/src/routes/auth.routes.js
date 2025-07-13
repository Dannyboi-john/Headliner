const express = require('express');
const router = express.Router();
const loginController = require('./controllers/login');
const registercontroller = require('./controllers/register');
const refreshController = require('./controllers/refresh');
const eventRoutes = require('./controllers/events');
const attendanceController = require('./controllers/attendance');
const eventLikes = require('./controllers/eventLikes');

//Auth
const authenticateToken = require('./controllers/authMiddleware');


router.post('/login', loginController);
router.post('/register', registercontroller);
router.post('/refresh', refreshController);
router.use('/events', authenticateToken, eventRoutes);
router.use('/attendance', authenticateToken, attendanceController);
router.use('/eventLikes', eventLikes);



// router.post('/authFetch', authFetchController);

module.exports = router;