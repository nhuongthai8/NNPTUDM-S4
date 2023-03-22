let mongoose = require('mongoose');
let configs = require('../configs/configs');
const bcrypt = require('bcrypt');

let Schema = new mongoose.Schema({
	username:String,
	email:String,
	roles:String,
	password:String
});

Schema.pre('save',function(){
	const salt =  bcrypt.genSaltSync(configs.saltRounds);
	this.password = bcrypt.hashSync(this.password, salt);
});

module.exports = mongoose.model(configs.user_Collection, Schema);