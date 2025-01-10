const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');

const app = express();

//Database connection
dbConnection();

//Public directory
app.use(express.static('public'));

//Reading and parsing body
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/auth'));


app.listen(process.env.PORT, () => {
    console.log('Server is running on port 4000');
});