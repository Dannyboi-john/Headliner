const express = require('express');
const router = express.Router();
const db = require('../../db');
const authenticateToken = require('./authMiddleware');

router.post('/:eventId', async (req, res) => {
    console.log('req.user: ', req.user);
    const { reaction } = req.body;
    const status = reaction;
    const userId = req.user.id;
    const eventId = req.params.eventId;

    try {
        await db.query(`
            INSERT INTO event_attendance (user_id, event_id, status)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE status = VALUES(status)
        `, [userId, eventId, reaction]);

        res.status(200).json({ message: 'reaction updated' });
    } catch (err) {
        console.error('DB Error:  ',  err);
        res.status(500).json({ error: err.message})
    }
});

router.get('/', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    try {
        const [rows] = await db.query(`
            SELECT event_id, status FROM event_attendance
            WHERE user_id = ?
        `, [userId]);

        res.json(rows);
    } catch (err) {
        res.status(500).json({  error: err.message });
    }
});

module.exports = router;