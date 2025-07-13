const express = require('express');
const router = express.Router();
const db = require('../../db');
const authenticateToken = require('./authMiddleware');

router.put('/:id/like', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const eventId = req.params.id;

    try {
        // Check if an attendance record already exists
        const [rows] = await db.query(
            `SELECT liked FROM event_attendance WHERE user_id = ? AND event_id = ?`,
            [userId, eventId]
        );

        if (rows.length > 0) {
            // Toggle the liked value
            const currentLike = rows[0].liked;
            await db.query(
                `UPDATE event_attendance SET liked = ? WHERE user_id = ? AND event_id = ?`,
                [!currentLike, userId, eventId]
            );
        } else {
            // No row? Create one (user liked without attending/interested)
            await db.query(
                `INSERT INTO event_attendance (user_id, event_id, liked) VALUES (?, ?, TRUE)`,
                [userId, eventId]
            );
        }

        res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to toggle like' });
    }
});

router.get('/:id/user', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const eventId = req.params.id;

    try {
        const [rows] = await db.query(
            'SELECT liked FROM event_attendance WHERE user_id = ? AND event_id = ?',
            [userId, eventId]
        );

        res.json({ liked: rows.length > 0 ? !!rows[0].liked : false });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get user like status :(' });
    }
});

router.get('/:id/likes', async (req, res) => {
    const eventId = req.params.id;

    try {
        const [rows] = await db.query(
            `SELECT COUNT(*) AS likeCount FROM event_attendance WHERE event_id = ? AND liked = TRUE`,
            [eventId]
        );

        res.json({ likes: rows[0].likeCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get like count' });
    }
});

module.exports = router;