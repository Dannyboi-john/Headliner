const jwt = require('jsonwebtoken');
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const SECRET = process.env.SECRET;

const refresh = (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(401).json({ error: 'No token provided'});

    jwt.verify(refreshToken, REFRESH_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token'});

        const newToken = jwt.sign(
            { id: user.id, username: user.username },
            SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token: newToken });
    })
};

module.exports = refresh;