const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
	const token = req.header('auth-token');

	if(!token) return res.status(401);
	try{
		const verified = jwt.verify(token, "sai");
		req.user = verified;
		next();
	} catch(err){
		res.sendStatus(401);
	}
}