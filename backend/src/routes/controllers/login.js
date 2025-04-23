const db = require('../../db');
const bcrypt = require('bcrypt');

const login = (req, res) => {
    const { username, password } = req.body

    db.query(
        'SELECT * FROM users WHERE username = ?',
        [username],
        async (err, results) => {
            if (err || results.length === 0) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }
            
            const user = results[0];
            const match = await bcrypt.compare(password, user.password_hash);

            if (match) {
                // JWT goes here later???
                res.json({ message: 'Login successful >:3', user: user })
            } else {
                res.status(401).json({ error: 'Invalid username or password ;_;' })
            }
        }

    );
};

module.exports = login;