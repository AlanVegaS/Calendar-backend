const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

const app = express();

//Database connection
dbConnection();

//CORS
app.use(cors());

//Public directory
app.use(express.static('public'));

//Reading and parsing body
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 4000');
});