const db = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;


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
                const payload = { id: user.id, username: user.username };
                const token = jwt.sign(payload, SECRET, {expiresIn: '1h'}); // Set to an hour for now.


                res.json({ 
                    message: 'Login successful >:3 token created!',
                    token,
                    user: payload 
                });

            } else {
                res.status(401).json({ error: 'Invalid username or password ;_;' })
            }
        }

    );
};

module.exports = login;