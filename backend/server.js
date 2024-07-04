const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const roleMiddleware = require('./middleware/roleMiddleware');
const recordsRouter = require('./routes/records');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 9000;
app.use(cors({origin:process.env.FRONTEND_URL}));

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/statxo');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use('/records', roleMiddleware, recordsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
