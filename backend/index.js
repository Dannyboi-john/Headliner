const express = require('express');
const cors = require("cors");
const authRoutes = require('./src/routes/authRoutes');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});

console.log("Hoooooiiiii :3");