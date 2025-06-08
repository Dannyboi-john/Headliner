const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../../db')

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../../uploads');
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

// POST route for creating an event
router.post('/', upload.single('image'), async (req, res) => {
    const {
        title,
        location,
        startTime,
        endTime,
        details,
    } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;


    try {
        const [results] = await db.execute(
            'INSERT INTO events (event_name, event_location, start_time, end_time, event_description, image_url) VALUES (?, ?, ?, ?, ?, ?)',
            [title, location, startTime, endTime, details, imageUrl]
        );
        res.status(201).json({ message: 'Event created successfully', eventId: results.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating event' });
    }
});

// Get route for displaying events
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM events ORDER BY start_time ASC');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching events: ', error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

module.exports = router;