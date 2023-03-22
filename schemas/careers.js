let mongoose = require('mongoose');
let configs = require('../configs/configs');
let Schema = new mongoose.Schema({
    _id: String,
    name: String,
    title: String,
    like: Number,
    dislike : Number
});
module.exports = mongoose.model(configs.career_Collection, Schema);