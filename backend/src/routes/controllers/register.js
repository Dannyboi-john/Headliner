const dbPromise = require('../../db');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const register = async (req, res) => {
    const { username, password } = req.body;

    // Checking for missing fields
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required'});
    }

    try {
        const db = await dbPromise;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert user into the database
        db.query(
            'INSERT INTO users (username, password_hash) VALUES (?, ?)',
            [username, hashedPassword],
            (err, results) => {
                if (err) {
                    // Check if username already exists
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(409).json({ error: 'Username taken' });
                    }
                    console.error('MySQL Error:', err);
                    return res.status(500).json({ error: 'Database error >:3'});
                }

                // On success:
                res.status(201).json({ message: 'User registered successfully' });
            }
        );
    } catch (error) {
        console.error('Registration error: ', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = register;