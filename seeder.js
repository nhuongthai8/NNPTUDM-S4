var mongoose = require('mongoose');
var config = require('./configs/configs');
var ItemsSchema = require('./schemas/items');
var CareersSchema = require('./schemas/careers');
var fs = require('fs');

mongoose.connect(config.DB_URL+config.DB_NAME);
var listItems = fs.readFileSync('./data/items.json','utf-8');
var listCareers = fs.readFileSync('./data/careers.json','utf-8');

async function ImportData(){
    try {
        await ItemsSchema.insertMany(JSON.parse(listItems));
        await CareersSchema.insertMany(JSON.parse(listCareers));
        console.log('Done');
        process.exit();
    } catch (error) {
        console.log('Error');
    }
}
async function ClearData(){
    try {
        await ItemsSchema.deleteMany({});
        await CareersSchema.deleteMany({});
        console.log('Clear');
        process.exit();
    } catch (error) {
        console.log('Error');
    }
}

if(process.argv[2]=='-i'){
    ImportData();
}
if(process.argv[2]=='-d'){
    ClearData();
}