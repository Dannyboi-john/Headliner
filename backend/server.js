const express = require('express');
const app = express();
const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:4000"]
};

app.use(cors(corsOptions));

const PORT = 3000;

app.get('/api', (req, res) => {
    res.json({"fruits": ["apple", "orange", "banana"] });
})

app.listen(PORT, ()  => {
    console.log(`Server is running on http://localhost:${PORT}`);
})