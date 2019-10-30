const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
	//check for user
	const emailExist = await User.findOne({email: req.body.email});
	if(emailExist){
		return res.sendStatus(400);
	}

	//hash password
	var salt = bcrypt.genSaltSync(10);
	var hashPassword = bcrypt.hashSync(req.body.password, salt);

	//new user
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashPassword,
	});
	try{
		const savedUser = await user.save();
		res.send(savedUser)
	}catch{
		res.sendStatus(400);
	}
});

//login

router.post('/login', async (req, res) => {
	const user = await User.findOne({email: req.body.email});

	if(!user){
		return res.sendStatus(400);
	}
	//matching the password
	 const validPass = await bcrypt.compare(req.body.password, user.password);

	 if(!validPass){
		return res.sendStatus(400);
	}

	//create jwt
	const token = jwt.sign({_id: user._id}, "sai");
	res.header('auth-token', token).send(token);
	return res.sendStatus(200);
});

module.exports = router;
