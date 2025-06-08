const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/auth.routes');
const path = require('path');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', authRoutes);

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});

console.log("Hoooooiiiii :3");