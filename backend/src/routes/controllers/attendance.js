/* const db = require('../../db');
const express = require('express');
const router = express.Router();

const respondToEvent = async (req, res) => {
    const { status } = req.body;
    const userId = req.user.id;
    const eventId = req.params.id;

    try {
        const [existing] = await db.query(`
            SELECT * FROM event_attendance
            WHERE user_id = ? AND event_id = ? AND status = ?
        `, [userId, eventId, status]);

        if (existing.length > 0) {
            await db.query(`
                DELETE FROM event_attendance
                WHERE user_id = ? AND event_id = ? AND status = ?
            `, [userId, eventId, status]);

            return res.json({ message: `${status} removed.`})
        }


        if (status === 'Going' || status === 'Interested') {
            await db.query(`
                DELETE FROM event_attendance
                WHERE user_id = ? AND event_id = ? AND status IN ('Going', 'Interested)
            `, [userId, eventId])
        }

        await db.query(`
            INSERT INTO event_attendance (user_id, event_id, status)\
            VALUES (?, ?, ?)
        `, [userId, eventId, status]);

        res.json({ message: `${status} recorded.` });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Uh-oh, something went wrong' });
    }
};

module.exports = {
    respondToEvent
}; */