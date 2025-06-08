const db = require('../../db');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert user into the database
        const [results] = await db.query(
            'INSERT INTO users (username, password_hash) VALUES (?, ?)',
            [username, hashedPassword]
        );

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Username taken' });
        }
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = register;