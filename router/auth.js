const express = require('express');
const router = express.Router();

require('../db/conn');
const User = require('../model/userSchema');

router.get('/', (req, res) => {
	res.send(`hello world from router.js`);
});

router.post('/register', async (req, res) => {
	const { name, email, phone, work, password, cpassword } = req.body;

	if (!name || !email || !phone || !work || !password || !cpassword) {
		return res.status(422).json({ error: 'pls filled the field properly' });
	}

	try {
		const userExist = await User.findOne({ email: email });
		if (userExist) {
			return res.status(422).json({ error: 'Email already exist' });
		}

		const user = new User({ name, email, phone, work, password, cpassword });
		await user.save();
		res.status(201).json({ message: 'user registered successfully' });
	} catch (error) {
		console.log(error);
	}
});

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ error: 'Pls filled the data' });
		}

		const userLogin = await User.findOne({ email: email });

		if (!userLogin) {
			res.status(400).json({ error: 'user error' });
		} else {
			res.json({ message: 'user login successfully' });
		}
	} catch (error) {
		console.log(error);
	}
});
module.exports = router;
