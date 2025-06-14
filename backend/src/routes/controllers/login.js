const db = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [results] = await db.query(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password_hash);

        if (!match) {
            return res.status(401).json({ error: 'Invalid username or password ;_;' });
        }

        const payload = { id: user.id, username: user.username };
        const token = jwt.sign(payload, SECRET, { expiresIn: '10s' });
        const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: '20s' });

        res.json({
            message: 'Login successful >:3 token created!',
            token,
            refreshToken,
            user: payload
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = login;