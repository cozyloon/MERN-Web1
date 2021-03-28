const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({ path: './config.env' });

require('./db/conn');
// const User = require('./model/userSchema');

app.use(express.json());

app.use(require('./router/auth'));

const PORT = process.env.PORT;

// middleware

app.get('/', (req, res) => {
	res.send(`hello world from server`);
});

app.get('/contact', (req, res) => {
	res.send(`contact from server`);
});

app.get('/about', (req, res) => {
	res.send(`about from server`);
});

app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
