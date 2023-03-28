let mongoose = require('mongoose');
let configs = require('../configs/configs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let Schema = new mongoose.Schema({
	username:String,
	email:String,
	roles:String,
	password:String
});

Schema.pre('save',function(next){
	const salt =  bcrypt.genSaltSync(configs.saltRounds);
	this.password = bcrypt.hashSync(this.password, salt);
	next();
});
Schema.methods.getSignedJWT=function(){
	return jwt.sign({id:this._id},configs.JWT_SECRET,{expiresIn:configs.JWT_EXPIRE});
}
Schema.statics.findByCredentinal = async function(email,password){
	if(!email||!password){
		return {error:'khong de trong email va password'};
	}
	let user = await this.findOne({email:email});
	if(!user){
		return {error:'email khong ton tai'};
	}
	let isMatch = await bcrypt.compare(password,user.password);
	if(!isMatch){
		return {error:'password sai'};
	}
	return user;

}
module.exports = mongoose.model(configs.user_Collection, Schema);