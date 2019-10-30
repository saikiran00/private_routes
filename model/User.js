const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
		name:{
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email:{
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password:{
			type: String,
			required: true,
			max: 1024,
			min: 6,
		},
},{
	timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User; 