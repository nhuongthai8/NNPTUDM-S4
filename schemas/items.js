let mongoose = require('mongoose');
let configs = require('../configs/configs');
let Schema = new mongoose.Schema({
    name: String,
    description: String,
    careers: [String],
    type: [String],
    local: String,
    web: String,
    address: String,
    phone: String,
    email: String
});
module.exports = mongoose.model(configs.item_Collection, Schema);