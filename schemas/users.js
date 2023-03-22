let mongoose = require('mongoose');
let configs = require('../configs/configs');
let Schema = new mongoose.Schema({
	username:String,
	email:String,
	roles:String,
	password:String
});
module.exports = mongoose.model(configs.user_Collection, Schema);